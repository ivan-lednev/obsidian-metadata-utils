import type { Pos } from "obsidian";

export const getTextAtPosition = (textInput: string, pos: Pos) =>
  textInput.substring(pos.start.offset, pos.end.offset);

export const getTextFromLineStartToPositionEnd = (
  textInput: string,
  pos: Pos
) => textInput.substring(pos.start.offset - pos.start.col, pos.end.offset);

export const doesPositionIncludeAnother = (container: Pos, child: Pos) =>
  container.start.offset <= child.start.offset &&
  container.end.offset >= child.end.offset;

export function isSamePosition(a?: Pos, b?: Pos) {
  return (
    a && b && a.start.offset === b.start.offset && a.end.offset === b.end.offset
  );
}

export function createPositionFromOffsets(
  content: string,
  startOffset: number,
  endOffset: number
) {
  const startLine = content.substring(0, startOffset).split("\n").length - 1;
  const endLine = content.substring(0, endOffset).split("\n").length - 1;

  const startLinePos = content.substring(0, startOffset).lastIndexOf("\n") + 1;
  const startCol = content.substring(startLinePos, startOffset).length;

  const endLinePos = content.substring(0, endOffset).lastIndexOf("\n") + 1;
  const endCol = content.substring(endLinePos, endOffset).length;

  return {
    position: {
      start: { line: startLine, col: startCol, offset: startOffset },
      end: { line: endLine, col: endCol, offset: endOffset },
    },
  };
}

export function highlightAtPositionWithRecalculatingOffsets(
  position: Pos,
  containerPosition: Pos,
  text: string
) {
  const containerStart = containerPosition.start.offset;
  const positionLength = position.end.offset - position.start.offset;

  const startOfPositionInContainer = position.start.offset - containerStart;
  const endOfPositionInContainer = positionLength + startOfPositionInContainer;

  const beforeHighlight = text.substring(0, startOfPositionInContainer);
  const highlight = text.substring(
    startOfPositionInContainer,
    endOfPositionInContainer
  );
  const afterHighlight = text.substring(endOfPositionInContainer);

  return `${beforeHighlight}<span class="search-result-file-matched-text">${highlight}</span>${afterHighlight}`;
}
