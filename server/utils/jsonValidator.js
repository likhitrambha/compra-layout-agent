export function validateLayout(layout) {
  if (!layout) throw new Error('Layout is null or undefined');
  if (!Array.isArray(layout.rootNodes)) throw new Error('rootNodes must be an array');
  if (typeof layout.nodes !== 'object') throw new Error('nodes must be an object');

  for (const id of layout.rootNodes) {
    if (!layout.nodes[id]) throw new Error(`Missing root node: ${id}`);
  }
  
  return true;
}
