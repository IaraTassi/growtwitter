import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useExpanded } from "../../../../src/features/feed/hooks/useExpanded";

describe("useExpanded", () => {
  it("should start with all items collapsed", () => {
    const { result } = renderHook(() => useExpanded());

    expect(result.current.isExpanded("1")).toBe(false);
    expect(result.current.isExpanded("abc")).toBe(false);
  });

  it("should expand an item when toggle is called", () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.toggle("1");
    });

    expect(result.current.isExpanded("1")).toBe(true);
  });

  it("should collapse an item when toggle is called twice", () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.toggle("1");
      result.current.toggle("1");
    });

    expect(result.current.isExpanded("1")).toBe(false);
  });

  it("should not affect other ids when toggling one item", () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.toggle("1");
    });

    expect(result.current.isExpanded("1")).toBe(true);
    expect(result.current.isExpanded("2")).toBe(false);
  });

  it("should maintain independent state for multiple ids", () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.toggle("1");
      result.current.toggle("2");
    });

    expect(result.current.isExpanded("1")).toBe(true);
    expect(result.current.isExpanded("2")).toBe(true);
  });

  it("should toggle items independently", () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.toggle("1");
      result.current.toggle("2");
      result.current.toggle("1");
    });

    expect(result.current.isExpanded("1")).toBe(false);
    expect(result.current.isExpanded("2")).toBe(true);
  });
});
