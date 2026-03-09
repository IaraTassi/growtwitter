import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { getFeed } from "../services/feedService";
import type { FeedTweet } from "../types";
import { toggleLike } from "../services/likeService";
import { mapFeed, mapFeedTweet } from "../mappers/feedMapper";
import { createReply } from "../services/replyService";
import { createTweet } from "../services/tweetService";

export const fetchFeed = createAsyncThunk<
  FeedTweet[],
  void,
  { state: RootState; rejectValue: string }
>("feed/fetchFeed", async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.token;
    const loggedUserId = auth.user?.id;

    if (!token) {
      return rejectWithValue("Token não encontrado");
    }

    const data = await getFeed(token);

    return mapFeed(data, loggedUserId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Erro ao buscar feed");
  }
});

export const toggleLikeThunk = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("feed/toggleLike", async (tweetId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("Token não encontrado");
    }

    await toggleLike(token, tweetId);

    return tweetId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Erro ao alternar like");
  }
});

export const createReplyThunk = createAsyncThunk<
  FeedTweet,
  { parentId: string; content: string },
  { state: RootState; rejectValue: string }
>(
  "feed/createReply",
  async ({ parentId, content }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const loggedUserId = auth.user?.id;

      if (!token) return rejectWithValue("Token não encontrado");

      const replyResponse = await createReply(token, parentId, content);

      if (!replyResponse) {
        return rejectWithValue("Não foi possível criar uma resposta");
      }

      return mapFeedTweet(replyResponse, loggedUserId);
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Erro ao criar resposta");
    }
  },
);

export const createTweetThunk = createAsyncThunk<
  FeedTweet,
  string,
  { state: RootState; rejectValue: string }
>("feed/createTweet", async (content, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.token;
    const loggedUserId = auth.user?.id;

    if (!token) return rejectWithValue("Token não encontrado");

    const tweet = await createTweet(token, content);

    return mapFeedTweet(tweet, loggedUserId);
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Erro ao criar tweet");
  }
});
