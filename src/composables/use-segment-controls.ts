import { MAX_SEGMENTS, MIN_SEGMENTS } from "@/constants"

import type { Segment, HexColor } from "@/types"
import type { Ref } from "vue"

export const useSegmentControls = (segments: Ref<Segment[]>) => {
  const onSegmentAdd = (name: string): void => {
    if (segments.value.length < MAX_SEGMENTS) {
      segments.value.push({ name: name.trim() })
    }
  }

  const onSegmentRemove = (index: number): void => {
    if (segments.value.length > MIN_SEGMENTS) {
      segments.value.splice(index, 1)
    }
  }

  const onSegmentUpdateName = (index: number, segment: string): void => {
    if (segment.trim() && segments.value.length < MAX_SEGMENTS) {
      segments.value[index].name = segment.trim()
    }
  }

  const onSegmentUpdateColor = (index: number, color: HexColor): void => {
    segments.value[index].color = color
  }

  return {
    onSegmentAdd,
    onSegmentRemove,
    onSegmentUpdateName,
    onSegmentUpdateColor,
  }
}
