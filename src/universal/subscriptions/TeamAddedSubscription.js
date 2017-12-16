import {handleAddTeamToViewerTeams} from 'universal/mutations/AddTeamMutation';

const subscription = graphql`
  subscription TeamAddedSubscription {
    teamAdded {
      team {
        id
        name
      }
    }
  }
`;


const TeamAddedSubscription = (environment) => {
  const {viewerId} = environment;
  return {
    subscription,
    updater: (store) => {
      const team = store.getRootField('teamAdded').getLinkedRecord('team');
      handleAddTeamToViewerTeams(store, viewerId, team);
    }
  };
};

export default TeamAddedSubscription;
