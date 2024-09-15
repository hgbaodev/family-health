export const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const result = findNodeById(node.children[i], id);
      if (result) return result;
    }
  }
  return null;
};

export const mergeNodeIntoTreeData = (treeData, newNode) => {
  let found = false;
  let updatedTreeData = treeData;

  // Remove node if it exists in the tree
  const removeNodeFromTree = (node, id) => {
    if (node.id === id) {
      found = true;
      return null;
    }
    if (node.children) {
      const updatedChildren = node.children
        .map((child) => removeNodeFromTree(child, id))
        .filter((child) => child !== null);
      return { ...node, children: updatedChildren };
    }
    return node;
  };

  updatedTreeData = updatedTreeData
    .map((node) => removeNodeFromTree(node, newNode.id))
    .filter((node) => node !== null);

  // If parent_id is null, add as root node
  if (newNode.parent_id === null) {
    updatedTreeData = [...updatedTreeData, { ...newNode, children: [] }];
  } else {
    // Add newNode to its new parent
    const addNodeToParent = (node, newNode) => {
      if (node.id === newNode.parent_id) {
        const newChild = { ...newNode, children: [] };
        return { ...node, children: [...(node.children || []), newChild] };
      }
      if (node.children) {
        const updatedChildren = node.children.map((child) =>
          addNodeToParent(child, newNode)
        );
        return { ...node, children: updatedChildren };
      }
      return node;
    };

    updatedTreeData = updatedTreeData.map((node) =>
      addNodeToParent(node, newNode)
    );
  }

  return updatedTreeData;
};

export const mergeNode = (node, newData, callback) => {
  if (node.id === newData.id) {
    callback(true);
    return { ...node, ...newData };
  }
  if (node.children) {
    const updatedChildren = node.children.map((child) =>
      mergeNode(child, newData, callback)
    );
    return { ...node, children: updatedChildren };
  }
  return node;
};
