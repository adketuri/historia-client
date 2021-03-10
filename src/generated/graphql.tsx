import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  findGames: Array<Game>;
  games: PaginatedGames;
  game?: Maybe<Game>;
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryFindGamesArgs = {
  search: Scalars['String'];
};


export type QueryGamesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGameArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  profile?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isSubmitter: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  submissions: Array<Game>;
  posts?: Maybe<Array<Post>>;
  favorites: Array<Game>;
  screenshots?: Maybe<Array<Screenshot>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Int'];
  slug: Scalars['String'];
  title: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Float']>;
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  submitterId: Scalars['Float'];
  submitter: User;
  favorited: Scalars['Boolean'];
  favoriteCount: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  screenshots?: Maybe<Array<Screenshot>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  game: Game;
  author: User;
};

export type Screenshot = {
  __typename?: 'Screenshot';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  verified: Scalars['Boolean'];
  game: Game;
  submitter: User;
};

export type PaginatedGames = {
  __typename?: 'PaginatedGames';
  games: Array<Game>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createScreenshot: Screenshot;
  favorite: Scalars['Boolean'];
  createGame: GameResponse;
  updateGame?: Maybe<Game>;
  deleteGame: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateScreenshotArgs = {
  url: Scalars['String'];
  gameId: Scalars['Int'];
};


export type MutationFavoriteArgs = {
  add: Scalars['Boolean'];
  gameId: Scalars['Int'];
};


export type MutationCreateGameArgs = {
  input: GameInput;
};


export type MutationUpdateGameArgs = {
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteGameArgs = {
  id: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  gameId: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  body: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GameResponse = {
  __typename?: 'GameResponse';
  errors?: Maybe<Array<FieldError>>;
  game?: Maybe<Game>;
};

export type GameInput = {
  title: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Float']>;
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularGameFragment = (
  { __typename?: 'Game' }
  & Pick<Game, 'id' | 'slug' | 'title' | 'author' | 'year' | 'shortDescription' | 'longDescription' | 'thumbnail' | 'banner' | 'favorited' | 'createdAt' | 'updatedAt' | 'favoriteCount'>
  & { submitter: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & RegularPostFragment
  )>>, screenshots?: Maybe<Array<(
    { __typename?: 'Screenshot' }
    & RegularScreenshotFragment
  )>> }
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'body'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularScreenshotFragment = (
  { __typename?: 'Screenshot' }
  & Pick<Screenshot, 'id' | 'createdAt' | 'updatedAt' | 'url' | 'verified'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'profile' | 'username' | 'isSubmitter' | 'isAdmin'>
  & { submissions: Array<(
    { __typename?: 'Game' }
    & RegularGameFragment
  )>, posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'body'>
  )>>, favorites: Array<(
    { __typename?: 'Game' }
    & RegularGameFragment
  )> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateGameMutationVariables = Exact<{
  input: GameInput;
}>;


export type CreateGameMutation = (
  { __typename?: 'Mutation' }
  & { createGame: (
    { __typename?: 'GameResponse' }
    & { game?: Maybe<(
      { __typename?: 'Game' }
      & RegularGameFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  gameId: Scalars['Int'];
  body: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type CreateScreenshotMutationVariables = Exact<{
  gameId: Scalars['Int'];
  url: Scalars['String'];
}>;


export type CreateScreenshotMutation = (
  { __typename?: 'Mutation' }
  & { createScreenshot: (
    { __typename?: 'Screenshot' }
    & RegularScreenshotFragment
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  body: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & RegularPostFragment
  )> }
);

export type FavoriteMutationVariables = Exact<{
  gameId: Scalars['Int'];
  add: Scalars['Boolean'];
}>;


export type FavoriteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'favorite'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type FindGamesQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type FindGamesQuery = (
  { __typename?: 'Query' }
  & { findGames: Array<(
    { __typename?: 'Game' }
    & RegularGameFragment
  )> }
);

export type GameQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
}>;


export type GameQuery = (
  { __typename?: 'Query' }
  & { game?: Maybe<(
    { __typename?: 'Game' }
    & RegularGameFragment
  )> }
);

export type GamesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GamesQuery = (
  { __typename?: 'Query' }
  & { games: (
    { __typename?: 'PaginatedGames' }
    & Pick<PaginatedGames, 'hasMore'>
    & { games: Array<(
      { __typename?: 'Game' }
      & RegularGameFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'isSubmitter' | 'isAdmin'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'body'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  createdAt
  updatedAt
  body
  author {
    id
    username
  }
}
    `;
export const RegularScreenshotFragmentDoc = gql`
    fragment RegularScreenshot on Screenshot {
  id
  createdAt
  updatedAt
  url
  verified
}
    `;
export const RegularGameFragmentDoc = gql`
    fragment RegularGame on Game {
  id
  slug
  title
  author
  year
  shortDescription
  longDescription
  thumbnail
  banner
  favorited
  createdAt
  updatedAt
  submitter {
    id
    username
  }
  posts {
    ...RegularPost
  }
  screenshots {
    ...RegularScreenshot
  }
  favoriteCount
}
    ${RegularPostFragmentDoc}
${RegularScreenshotFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  profile
  username
  isSubmitter
  isAdmin
  submissions {
    ...RegularGame
  }
  posts {
    id
    createdAt
    updatedAt
    body
  }
  favorites {
    ...RegularGame
  }
}
    ${RegularGameFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateGameDocument = gql`
    mutation CreateGame($input: GameInput!) {
  createGame(input: $input) {
    game {
      ...RegularGame
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularGameFragmentDoc}
${RegularErrorFragmentDoc}`;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($gameId: Int!, $body: String!) {
  createPost(gameId: $gameId, body: $body) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateScreenshotDocument = gql`
    mutation CreateScreenshot($gameId: Int!, $url: String!) {
  createScreenshot(gameId: $gameId, url: $url) {
    ...RegularScreenshot
  }
}
    ${RegularScreenshotFragmentDoc}`;
export type CreateScreenshotMutationFn = Apollo.MutationFunction<CreateScreenshotMutation, CreateScreenshotMutationVariables>;

/**
 * __useCreateScreenshotMutation__
 *
 * To run a mutation, you first call `useCreateScreenshotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScreenshotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScreenshotMutation, { data, loading, error }] = useCreateScreenshotMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateScreenshotMutation(baseOptions?: Apollo.MutationHookOptions<CreateScreenshotMutation, CreateScreenshotMutationVariables>) {
        return Apollo.useMutation<CreateScreenshotMutation, CreateScreenshotMutationVariables>(CreateScreenshotDocument, baseOptions);
      }
export type CreateScreenshotMutationHookResult = ReturnType<typeof useCreateScreenshotMutation>;
export type CreateScreenshotMutationResult = Apollo.MutationResult<CreateScreenshotMutation>;
export type CreateScreenshotMutationOptions = Apollo.BaseMutationOptions<CreateScreenshotMutation, CreateScreenshotMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $body: String!) {
  updatePost(id: $id, body: $body) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const FavoriteDocument = gql`
    mutation favorite($gameId: Int!, $add: Boolean!) {
  favorite(gameId: $gameId, add: $add)
}
    `;
export type FavoriteMutationFn = Apollo.MutationFunction<FavoriteMutation, FavoriteMutationVariables>;

/**
 * __useFavoriteMutation__
 *
 * To run a mutation, you first call `useFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteMutation, { data, loading, error }] = useFavoriteMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      add: // value for 'add'
 *   },
 * });
 */
export function useFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteMutation, FavoriteMutationVariables>) {
        return Apollo.useMutation<FavoriteMutation, FavoriteMutationVariables>(FavoriteDocument, baseOptions);
      }
export type FavoriteMutationHookResult = ReturnType<typeof useFavoriteMutation>;
export type FavoriteMutationResult = Apollo.MutationResult<FavoriteMutation>;
export type FavoriteMutationOptions = Apollo.BaseMutationOptions<FavoriteMutation, FavoriteMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FindGamesDocument = gql`
    query FindGames($search: String!) {
  findGames(search: $search) {
    ...RegularGame
  }
}
    ${RegularGameFragmentDoc}`;

/**
 * __useFindGamesQuery__
 *
 * To run a query within a React component, call `useFindGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGamesQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFindGamesQuery(baseOptions: Apollo.QueryHookOptions<FindGamesQuery, FindGamesQueryVariables>) {
        return Apollo.useQuery<FindGamesQuery, FindGamesQueryVariables>(FindGamesDocument, baseOptions);
      }
export function useFindGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindGamesQuery, FindGamesQueryVariables>) {
          return Apollo.useLazyQuery<FindGamesQuery, FindGamesQueryVariables>(FindGamesDocument, baseOptions);
        }
export type FindGamesQueryHookResult = ReturnType<typeof useFindGamesQuery>;
export type FindGamesLazyQueryHookResult = ReturnType<typeof useFindGamesLazyQuery>;
export type FindGamesQueryResult = Apollo.QueryResult<FindGamesQuery, FindGamesQueryVariables>;
export const GameDocument = gql`
    query Game($id: Int, $slug: String) {
  game(id: $id, slug: $slug) {
    ...RegularGame
  }
}
    ${RegularGameFragmentDoc}`;

/**
 * __useGameQuery__
 *
 * To run a query within a React component, call `useGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGameQuery(baseOptions?: Apollo.QueryHookOptions<GameQuery, GameQueryVariables>) {
        return Apollo.useQuery<GameQuery, GameQueryVariables>(GameDocument, baseOptions);
      }
export function useGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameQuery, GameQueryVariables>) {
          return Apollo.useLazyQuery<GameQuery, GameQueryVariables>(GameDocument, baseOptions);
        }
export type GameQueryHookResult = ReturnType<typeof useGameQuery>;
export type GameLazyQueryHookResult = ReturnType<typeof useGameLazyQuery>;
export type GameQueryResult = Apollo.QueryResult<GameQuery, GameQueryVariables>;
export const GamesDocument = gql`
    query Games($limit: Int!, $cursor: String) {
  games(limit: $limit, cursor: $cursor) {
    hasMore
    games {
      ...RegularGame
    }
  }
}
    ${RegularGameFragmentDoc}`;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGamesQuery(baseOptions: Apollo.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        return Apollo.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, baseOptions);
      }
export function useGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          return Apollo.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, baseOptions);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = Apollo.QueryResult<GamesQuery, GamesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    isSubmitter
    isAdmin
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    createdAt
    updatedAt
    author {
      id
      username
    }
    body
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;