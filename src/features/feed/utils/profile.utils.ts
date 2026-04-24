import type { ProfileReplyResponseDto, ReplyTree } from "../types";

export function flattenReplies(node: ReplyTree): ProfileReplyResponseDto[] {
  return [node, ...node.replies.flatMap(flattenReplies)];
}

export function findReply(
  node: ProfileReplyResponseDto,
  id: string,
): ProfileReplyResponseDto | null {
  if (node.id === id) return node;

  for (const reply of node.replies) {
    const found = findReply(reply, id);
    if (found) return found;
  }

  return null;
}

export function hasRepliesDeep(node: ProfileReplyResponseDto): boolean {
  return !!node.replies?.length;
}

export function filterReplyRoots(
  roots: ProfileReplyResponseDto[],
): ProfileReplyResponseDto[] {
  return roots.filter(hasRepliesDeep);
}
