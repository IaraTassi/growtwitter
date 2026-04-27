import type { ProfileReplyResponseDto } from "../types";

export function hasRepliesDeep(node: ProfileReplyResponseDto): boolean {
  return !!node.replies?.length;
}

export function filterReplyRoots(
  roots: ProfileReplyResponseDto[],
): ProfileReplyResponseDto[] {
  return roots.filter(hasRepliesDeep);
}
