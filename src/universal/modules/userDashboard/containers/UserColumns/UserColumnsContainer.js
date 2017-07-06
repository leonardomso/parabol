import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {cashay} from 'cashay';
import makeProjectsByStatus from 'universal/utils/makeProjectsByStatus';
import {USER_DASH} from 'universal/utils/constants';
import ProjectColumns from 'universal/components/ProjectColumns/ProjectColumns';
import makeAllProjects from 'universal/utils/makeAllProjects';

// TODO this is a sign that cashay is missing something. how do we request a LIST of just projects?
const userColumnsQuery = `
query {
  teams @cached(type: "[Team]") {
    id
    name
    projects @live {
      id
      content
      createdAt
      createdBy
      sortOrder
      status
      tags
      teamMemberId
      updatedAt
      team @cached(type: "Team") {
        id
        name
      }
      teamMember @cached(type: "TeamMember") {
        id
        picture
        preferredName
      }
    }
  }
}
`;

const mutationHandlers = {
  updateProject(optimisticUpdates, queryResponse, currentResponse) {
    if (optimisticUpdates) {
      const {updatedProject} = optimisticUpdates;
      if (updatedProject && updatedProject.hasOwnProperty('sortOrder')) {
        const {id, sortOrder, status} = updatedProject;
        const {teams} = currentResponse;
        for (let i = 0; i < teams.length; i++) {
          const team = teams[i];
          const fromProject = team.projects.find((project) => project.id === id);
          if (fromProject) {
            if (sortOrder !== undefined) {
              fromProject.sortOrder = sortOrder;
            }
            if (status) {
              fromProject.status = status;
            }
            return currentResponse;
          }
        }
      }
    }
    return undefined;
  }
};

// memoized
const resolveUserProjects = (teams) => {
  if (teams !== resolveUserProjects.teams) {
    resolveUserProjects.teams = teams;
    const allProjects = makeAllProjects(teams);
    resolveUserProjects.cache = makeProjectsByStatus(allProjects);
  }
  return resolveUserProjects.cache;
};

const mapStateToProps = (state) => {
  const {sub: userId} = state.auth.obj;
  const {teamFilterId} = state.userDashboard;
  const filterFn = teamFilterId ? (doc) => doc.id === teamFilterId : () => true;
  const queryKey = teamFilterId || '';
  const {teams} = cashay.query(userColumnsQuery, {
    op: 'userColumnsContainer',
    key: queryKey,
    mutationHandlers,
    resolveCached: {
      teams: () => () => true,
      team: (source) => source.teamMemberId.split('::')[1],
      teamMember: (source) => source.teamMemberId
    },
    resolveChannelKey: {
      projects: (source) => `${userId}::${source.id}`
    },
    sort: {
      teams: (a, b) => a.name > b.name ? 1 : -1
    },
    filter: {
      teams: filterFn
    }
  }).data;
  return {
    projects: resolveUserProjects(teams),
    queryKey,
    teams,
    userId: state.auth.obj.sub
  };
};

const UserColumnsContainer = (props) => {
  const {queryKey, projects, teams, userId} = props;
  return (
    <ProjectColumns queryKey={queryKey} projects={projects} area={USER_DASH} teams={teams} userId={userId} />
  );
};

UserColumnsContainer.propTypes = {
  projects: PropTypes.object,
  queryKey: PropTypes.string,
  teams: PropTypes.array,
  userId: PropTypes.string
};

export default connect(mapStateToProps)(UserColumnsContainer);
