import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Timestamp: any;
};

export type Actor = Participant | Investigator;

export type Audit = {
  __typename?: 'Audit';
  id: Scalars['ID'];
  action: Scalars['String'];
  performedAt: Scalars['Timestamp'];
  performedBy?: Maybe<Actor>;
};

export type AuditConnection = {
  __typename?: 'AuditConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<AuditEdge>>;
};

export type AuditEdge = {
  __typename?: 'AuditEdge';
  node?: Maybe<Audit>;
  cursor: Scalars['Cursor'];
};

export type CheckboxResponse = {
  __typename?: 'CheckboxResponse';
  id: Scalars['ID'];
  type: QuestionType;
  respondent?: Maybe<Participant>;
  choices?: Maybe<Array<Choice>>;
  responses?: Maybe<Array<Choice>>;
};

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type CreateInvestigatorInput = {
  name: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Sex;
};

export type CreateOrganisationInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateTeamInput = {
  organisationId: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type CreateTrialInput = {
  startTime: Scalars['Timestamp'];
  duration: Scalars['Int'];
  title: Scalars['String'];
  synopsis: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']>;
  teamId: Scalars['String'];
};

export type Criteria = {
  __typename?: 'Criteria';
  inclusion?: Maybe<Factor>;
  exclusion?: Maybe<Factor>;
};

export enum Epoch {
  Hours = 'HOURS',
  Days = 'DAYS',
  Weeks = 'WEEKS',
  Months = 'MONTHS',
}

export type Factor = {
  __typename?: 'Factor';
  condition?: Maybe<Array<Scalars['String']>>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type Investigator = {
  __typename?: 'Investigator';
  id: Scalars['ID'];
  auditLog?: Maybe<AuditConnection>;
  createdAt: Scalars['Timestamp'];
  deletedAt?: Maybe<Scalars['Timestamp']>;
  verifiedAt?: Maybe<Scalars['Timestamp']>;
  name: Scalars['String'];
  dateOfBirth: Scalars['String'];
  sex: Sex;
  email: Scalars['String'];
  isOnboarded?: Maybe<Scalars['Boolean']>;
  organisations?: Maybe<OrganisationConnection>;
  teams?: Maybe<TeamConnection>;
  trials?: Maybe<TrialConnection>;
};

export type InvestigatorOrganisationsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type InvestigatorTeamsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type InvestigatorTrialsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type InvestigatorConnection = {
  __typename?: 'InvestigatorConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<InvestigatorEdge>>;
};

export type InvestigatorEdge = {
  __typename?: 'InvestigatorEdge';
  node?: Maybe<Investigator>;
  cursor: Scalars['Cursor'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createParticipantAccount?: Maybe<Participant>;
  createInvestigator?: Maybe<Investigator>;
  createOrganisation?: Maybe<Organisation>;
  createTeam?: Maybe<Team>;
  createTrial?: Maybe<Trial>;
  getServerTime?: Maybe<Scalars['Timestamp']>;
};

export type MutationCreateParticipantAccountArgs = {
  input?: Maybe<ParticipantInput>;
};

export type MutationCreateInvestigatorArgs = {
  input?: Maybe<CreateInvestigatorInput>;
};

export type MutationCreateOrganisationArgs = {
  input: CreateOrganisationInput;
};

export type MutationCreateTeamArgs = {
  input?: Maybe<CreateTeamInput>;
};

export type MutationCreateTrialArgs = {
  input?: Maybe<CreateTrialInput>;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
  auditLog?: Maybe<AuditConnection>;
  createdAt: Scalars['Timestamp'];
  deletedAt?: Maybe<Scalars['Timestamp']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  logo?: Maybe<Image>;
  creator?: Maybe<Investigator>;
  admins?: Maybe<InvestigatorConnection>;
  collaborators?: Maybe<InvestigatorConnection>;
  observers?: Maybe<InvestigatorConnection>;
  teams?: Maybe<TeamConnection>;
};

export type OrganisationAdminsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type OrganisationCollaboratorsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type OrganisationObserversArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type OrganisationTeamsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type OrganisationConnection = {
  __typename?: 'OrganisationConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<OrganisationEdge>>;
};

export type OrganisationEdge = {
  __typename?: 'OrganisationEdge';
  node?: Maybe<Organisation>;
  cursor: Scalars['Cursor'];
};

export type OrganisationNotFound = {
  __typename?: 'OrganisationNotFound';
  error: Scalars['String'];
};

export type OrganisationResult = Organisation | OrganisationNotFound;

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['Cursor']>;
  endCursor?: Maybe<Scalars['Cursor']>;
};

export type PaginationInput = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['Cursor']>;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  createdAt: Scalars['Timestamp'];
  deletedAt?: Maybe<Scalars['Timestamp']>;
  verifiedAt?: Maybe<Scalars['Timestamp']>;
  auditLog?: Maybe<AuditConnection>;
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type ParticipantConnection = {
  __typename?: 'ParticipantConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<ParticipantEdge>>;
};

export type ParticipantEdge = {
  __typename?: 'ParticipantEdge';
  node?: Maybe<Participant>;
  cursor: Scalars['Cursor'];
};

export type ParticipantInput = {
  name: Scalars['String'];
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getInvestigator?: Maybe<Investigator>;
  getInvestigatorByProviderUid?: Maybe<Investigator>;
  getOrganisationById?: Maybe<Organisation>;
  getOrganisationBySlug?: Maybe<Organisation>;
  getEligibleTrials?: Maybe<TrialConnection>;
  getTrial?: Maybe<Trial>;
  getServerTime?: Maybe<Scalars['Timestamp']>;
};

export type QueryGetOrganisationByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetOrganisationBySlugArgs = {
  slug: Scalars['String'];
};

export type QueryGetEligibleTrialsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type QueryGetTrialArgs = {
  trialId: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID'];
  title: Scalars['String'];
  type: QuestionType;
  optional: Scalars['Boolean'];
  choices?: Maybe<Array<Choice>>;
  trial?: Maybe<Trial>;
};

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<QuestionEdge>>;
};

export type QuestionEdge = {
  __typename?: 'QuestionEdge';
  node?: Maybe<Question>;
  cursor: Scalars['Cursor'];
};

export enum QuestionType {
  Radio = 'RADIO',
  Checkbox = 'CHECKBOX',
  Scale = 'SCALE',
  Text = 'TEXT',
}

export type RadioResponse = {
  __typename?: 'RadioResponse';
  id: Scalars['ID'];
  type: QuestionType;
  respondent?: Maybe<Participant>;
  choices?: Maybe<Array<Choice>>;
  response?: Maybe<Choice>;
};

export type Response =
  | RadioResponse
  | CheckboxResponse
  | ScaleResponse
  | TextResponse;

export type ResponseConnection = {
  __typename?: 'ResponseConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<ResponseEdge>>;
};

export type ResponseEdge = {
  __typename?: 'ResponseEdge';
  node?: Maybe<Response>;
  cursor: Scalars['Cursor'];
};

export type ScaleResponse = {
  __typename?: 'ScaleResponse';
  id: Scalars['ID'];
  type: QuestionType;
  respondent?: Maybe<Participant>;
  response: Scalars['Float'];
};

export enum Sex {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  auditLog?: Maybe<AuditConnection>;
  createdAt: Scalars['Timestamp'];
  deletedAt?: Maybe<Scalars['Timestamp']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  members?: Maybe<InvestigatorConnection>;
  organisation?: Maybe<Organisation>;
  trials?: Maybe<TrialConnection>;
};

export type TeamMembersArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type TeamTrialsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<TeamEdge>>;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  node?: Maybe<Team>;
  cursor: Scalars['Cursor'];
};

export type TextResponse = {
  __typename?: 'TextResponse';
  id: Scalars['ID'];
  type: QuestionType;
  respondent?: Maybe<Participant>;
  response: Scalars['String'];
};

export type Trial = {
  __typename?: 'Trial';
  id: Scalars['ID'];
  createdAt: Scalars['Timestamp'];
  lastUpdatedAt?: Maybe<Scalars['Timestamp']>;
  deletedAt?: Maybe<Scalars['Timestamp']>;
  auditLog?: Maybe<AuditConnection>;
  criteria?: Maybe<Criteria>;
  lead?: Maybe<Investigator>;
  investigators?: Maybe<InvestigatorConnection>;
  participants?: Maybe<ParticipantConnection>;
  minimumParticipantCount?: Maybe<Scalars['Int']>;
  state?: Maybe<TrialState>;
  title?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  startTime?: Maybe<Scalars['Timestamp']>;
  endTime?: Maybe<Scalars['Timestamp']>;
  triggerTime?: Maybe<TriggerTime>;
  triggerFrequency?: Maybe<TriggerFrequency>;
  questions?: Maybe<QuestionConnection>;
};

export type TrialInvestigatorsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type TrialParticipantsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type TrialQuestionsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type TrialConnection = {
  __typename?: 'TrialConnection';
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
  edges: Array<Maybe<TrialEdge>>;
};

export type TrialEdge = {
  __typename?: 'TrialEdge';
  node?: Maybe<Trial>;
  cursor: Scalars['Cursor'];
};

export enum TrialState {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Enlisting = 'ENLISTING',
  Startable = 'STARTABLE',
  Ongoing = 'ONGOING',
  Done = 'DONE',
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
}

export type TriggerFrequency = {
  __typename?: 'TriggerFrequency';
  count: Scalars['Int'];
  unit: Epoch;
};

export type TriggerTime = {
  __typename?: 'TriggerTime';
  hour: Scalars['Int'];
  minute: Scalars['Int'];
};

export type GetLoginAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetLoginAccountQuery = { __typename?: 'Query' } & {
  getInvestigatorByProviderUid?: Maybe<
    { __typename?: 'Investigator' } & Pick<
      Investigator,
      'id' | 'name' | 'email' | 'createdAt' | 'isOnboarded'
    >
  >;
};

export type GetInvestigatorQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvestigatorQuery = { __typename?: 'Query' } & {
  getInvestigator?: Maybe<
    { __typename?: 'Investigator' } & Pick<
      Investigator,
      'id' | 'name' | 'email' | 'createdAt'
    >
  >;
};

export const GetLoginAccountDocument = gql`
  query getLoginAccount {
    getInvestigatorByProviderUid {
      id
      name
      email
      createdAt
      isOnboarded
    }
  }
`;

/**
 * __useGetLoginAccountQuery__
 *
 * To run a query within a React component, call `useGetLoginAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginAccountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLoginAccountQuery,
    GetLoginAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLoginAccountQuery, GetLoginAccountQueryVariables>(
    GetLoginAccountDocument,
    options,
  );
}
export function useGetLoginAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLoginAccountQuery,
    GetLoginAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLoginAccountQuery,
    GetLoginAccountQueryVariables
  >(GetLoginAccountDocument, options);
}
export type GetLoginAccountQueryHookResult = ReturnType<
  typeof useGetLoginAccountQuery
>;
export type GetLoginAccountLazyQueryHookResult = ReturnType<
  typeof useGetLoginAccountLazyQuery
>;
export type GetLoginAccountQueryResult = Apollo.QueryResult<
  GetLoginAccountQuery,
  GetLoginAccountQueryVariables
>;
export const GetInvestigatorDocument = gql`
  query getInvestigator {
    getInvestigator {
      id
      name
      email
      createdAt
    }
  }
`;

/**
 * __useGetInvestigatorQuery__
 *
 * To run a query within a React component, call `useGetInvestigatorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvestigatorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvestigatorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvestigatorQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInvestigatorQuery,
    GetInvestigatorQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvestigatorQuery, GetInvestigatorQueryVariables>(
    GetInvestigatorDocument,
    options,
  );
}
export function useGetInvestigatorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInvestigatorQuery,
    GetInvestigatorQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetInvestigatorQuery,
    GetInvestigatorQueryVariables
  >(GetInvestigatorDocument, options);
}
export type GetInvestigatorQueryHookResult = ReturnType<
  typeof useGetInvestigatorQuery
>;
export type GetInvestigatorLazyQueryHookResult = ReturnType<
  typeof useGetInvestigatorLazyQuery
>;
export type GetInvestigatorQueryResult = Apollo.QueryResult<
  GetInvestigatorQuery,
  GetInvestigatorQueryVariables
>;
