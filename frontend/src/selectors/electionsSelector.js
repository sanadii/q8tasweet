import { createSelector } from 'reselect';

const selectElectionsState = state => state.Elections;
const selectCategoriesState = state => state.Categories;
const selectCampaignsState = state => state.Campaigns;
const selectUsersState = state => state.Users;

export const electionsSelector = createSelector(
  selectElectionsState,
  selectUsersState,
  selectCategoriesState,
  selectCampaignsState,
  (electionsState, usersState, categoriesState, campaignsState) => ({
    elections: electionsState.elections,
    isElectionSuccess: electionsState.isElectionSuccess,
    error: electionsState.error,
    categories: categoriesState.categories,
    subCategories: categoriesState.subCategories,

    // Campaigns
    campaigns: campaignsState.campaigns,
    campaign: campaignsState.campaignDetails,

    campaignDetails: campaignsState.campaignDetails,
    campaignMembers: campaignsState.campaignMembers,
    campaignGuarantees: campaignsState.campaignGuarantees,
    isCampaignSuccess: campaignsState.isCampaignSuccess,

    electionCommittees: campaignsState.electionCommittees,
    electionCandidates: campaignsState.electionCandidates,
    electionAttendees: campaignsState.electionAttendees, // Added electionAttendees

    // Users
    moderators: usersState.moderators,
    currentUser: usersState.currentUser, // Added currentUser
    currentCampaignMember: campaignsState.currentCampaignMember, // Added currentCampaignMember
    electors: campaignsState.electors, // Added electors

  })
);