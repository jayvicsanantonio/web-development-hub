import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilter } from './useFilter';

type Tagged = { title: string; tags?: string[] };

const resources: Tagged[] = [
  { title: 'React', tags: ['javascript', 'library', 'modern'] },
  { title: 'Vue', tags: ['javascript', 'framework'] },
  { title: 'Django', tags: ['python', 'framework'] },
  { title: 'Untagged' },
];

describe('useFilter', () => {
  it('starts with no tags selected', () => {
    const { result } = renderHook(() => useFilter());
    expect(result.current.selectedTags).toEqual([]);
    expect(result.current.hasSelectedTags).toBe(false);
  });

  it('toggles a tag on and back off', () => {
    const { result } = renderHook(() => useFilter());

    act(() => result.current.toggleTag('javascript'));
    expect(result.current.selectedTags).toEqual(['javascript']);
    expect(result.current.hasSelectedTags).toBe(true);
    expect(result.current.isTagSelected('javascript')).toBe(true);

    act(() => result.current.toggleTag('javascript'));
    expect(result.current.selectedTags).toEqual([]);
  });

  it('keeps every selection until it is cleared', () => {
    const { result } = renderHook(() => useFilter());

    act(() => result.current.toggleTag('a'));
    act(() => result.current.toggleTag('b'));
    expect(result.current.selectedTags).toEqual(['a', 'b']);

    act(() => result.current.clearAllTags());
    expect(result.current.selectedTags).toEqual([]);
  });

  it('returns everything when nothing is selected', () => {
    const { result } = renderHook(() => useFilter());
    expect(result.current.filterResourcesByTags(resources)).toEqual(
      resources
    );
  });

  it('keeps only resources carrying a selected tag', () => {
    const { result } = renderHook(() => useFilter());
    act(() => result.current.toggleTag('framework'));

    expect(
      result.current
        .filterResourcesByTags(resources)
        .map((r) => r.title)
    ).toEqual(['Vue', 'Django']);
  });

  it('drops resources with no tags once a tag is selected', () => {
    const { result } = renderHook(() => useFilter());
    act(() => result.current.toggleTag('javascript'));

    expect(
      result.current
        .filterResourcesByTags(resources)
        .map((r) => r.title)
    ).not.toContain('Untagged');
  });
});
