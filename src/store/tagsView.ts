import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Route } from '@/router'

export type TagView = Partial<RouteLocationNormalizedLoaded> & {
  title?: string
  meta?: Partial<Route['meta']>
}

export type VisitedViews = TagView
export type CachedViews = string
export interface TagsViewsState {
  visitedViews: VisitedViews[],
  cachedViews: CachedViews[]
}

export const useTagsViewStore = defineStore('tagsView', {
  state: () => ({
    visitedViews: [] as VisitedViews[],
    cachedViews: [] as CachedViews[]
  }),
  actions: {
    addView(view: TagView) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view: TagView) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push({ ...view, title: view?.meta?.title || '' })
    },
    addCachedView(view: TagView) {
      if (!view.name || this.cachedViews.includes(String(view.name))) return
      if (!view?.meta?.noCache) {
        this.cachedViews.push(String(view.name))
      }
    },

    delView(view: TagView): TagsViewsState {
      return {
        visitedViews: this.delVisitedView(view),
        cachedViews: this.delCachedView(view)
      }
    },
    delVisitedView(view: TagView): VisitedViews[] {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      return [...this.visitedViews]
    },
    delCachedView(view: TagView): CachedViews[] {
      const index = this.cachedViews.indexOf(String(view.name))
      index > -1 && this.cachedViews.splice(index, 1)
      return [...this.cachedViews]
    },

    delOthersViews(view: TagView): TagsViewsState {
      return {
        visitedViews: this.delOthersVisitedViews(view),
        cachedViews: this.delOthersCachedViews(view)
      }
    },
    delOthersVisitedViews(view: TagView): VisitedViews[] {
      this.visitedViews = this.visitedViews.filter(v => {
        return v?.meta?.affix || v.path === view.path
      })
      return [...this.visitedViews]
    },
    delOthersCachedViews(view: TagView): CachedViews[] {
      const index = this.cachedViews.indexOf(String(view.name))
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
      return [...this.cachedViews]
    },

    delAllViews(): TagsViewsState {
      return {
        visitedViews: this.delAllVisitedViews(),
        cachedViews: this.delAllCachedViews()
      }
    },
    delAllVisitedViews() {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag) => tag?.meta?.affix)
      this.visitedViews = affixTags
      return [...this.visitedViews]
    },
    delAllCachedViews() {
      this.cachedViews = []
      return [...this.cachedViews]
    },

    updateVisitedView(view: TagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
