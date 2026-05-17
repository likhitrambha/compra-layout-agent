import React from 'react';

export default function WireframePreview({ layout }) {
  if (!layout || !layout.rootNodes || layout.rootNodes.length === 0) return null;

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  if (!artboard) return null;

  const aspectRatio = artboard.height / artboard.width;

  function getColorForType(type) {
    return {
      image: 'rgba(99, 102, 241, 0.2)', // Indigo 500 w/ opacity
      text: 'rgba(245, 158, 11, 0.2)', // Amber 500 w/ opacity
      shape: 'rgba(239, 68, 68, 0.2)'  // Red 500 w/ opacity
    }[type] || 'rgba(203, 213, 225, 0.5)';
  }

  function getBorderForType(type) {
    return {
      image: '1px solid rgba(99, 102, 241, 0.5)',
      text: '1px solid rgba(245, 158, 11, 0.5)',
      shape: '1px solid rgba(239, 68, 68, 0.5)'
    }[type] || '1px solid #ccc';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${aspectRatio * 100}%`,
        background: artboard.data?.backgroundColor || '#ffffff',
      }}
    >
      {artboard.children?.map((id) => {
        const node = layout.nodes[id];
        if (!node) return null;

        const isCircle = node.type === 'shape' && node.data?.shapeType === 'circle';

        return (
          <div
            key={id}
            className="absolute flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              left: `${node.nx * 100}%`,
              top: `${node.ny * 100}%`,
              width: `${node.nw * 100}%`,
              height: `${node.nh * 100}%`,
              background: getColorForType(node.type),
              border: getBorderForType(node.type),
              borderRadius: isCircle ? '50%' : '4px',
            }}
            title={node.name}
          >
            <div className="p-2 w-full h-full flex flex-col items-center justify-center">
              {node.type === 'text' && (
                <span className="text-amber-700 font-medium text-center truncate w-full text-[10px] sm:text-xs">
                  {node.data?.content}
                </span>
              )}
              {node.type === 'image' && (
                <span className="text-indigo-700 text-[10px] font-medium truncate w-full text-center">
                  {node.name}
                </span>
              )}
              {node.type === 'shape' && (
                <span className="text-red-700 text-[10px] font-medium truncate w-full text-center">
                  {node.name}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
