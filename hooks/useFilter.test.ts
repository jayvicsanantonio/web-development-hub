import { describe, it, expect, vi } from 'vitest';
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

  it('honours initial tags', () => {
    const { result } = renderHook(() =>
      useFilter({ initialTags: ['python'] })
    );
    expect(result.current.isTagSelected('python')).toBe(true);
  });

  it('toggles a tag on and back off', () => {
    const { result } = renderHook(() => useFilter());

    act(() => result.current.toggleTag('javascript'));
    expect(result.current.selectedTags).toEqual(['javascript']);
    expect(result.current.hasSelectedTags).toBe(true);

    act(() => result.current.toggleTag('javascript'));
    expect(result.current.selectedTags).toEqual([]);
  });

  it('does not add the same tag twice', () => {
    const { result } = renderHook(() => useFilter());
    act(() => result.current.addTag('javascript'));
    act(() => result.current.addTag('javascript'));
    expect(result.current.selectedTags).toEqual(['javascript']);
  });

  it('respects maxTags', () => {
    const { result } = renderHook(() => useFilter({ maxTags: 2 }));
    act(() => result.current.addTag('a'));
    act(() => result.current.addTag('b'));
    act(() => result.current.addTag('c'));
    expect(result.current.selectedTags).toEqual(['a', 'b']);
  });

  it('clears every selection', () => {
    const { result } = renderHook(() =>
      useFilter({ initialTags: ['a', 'b'] })
    );
    act(() => result.current.clearAllTags());
    expect(result.current.selectedTags).toEqual([]);
  });

  it('notifies onTagsChange', () => {
    const onTagsChange = vi.fn();
    const { result } = renderHook(() => useFilter({ onTagsChange }));
    act(() => result.current.addTag('python'));
    expect(onTagsChange).toHaveBeenCalledWith(['python']);
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
