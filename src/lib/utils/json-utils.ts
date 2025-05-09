export function collectAllPaths(node: object, path: string[] = []): string[] {
    let paths: string[] = [];

    for (const [key, value] of Object.entries(node)) {
        const fullPath = [...path, key];
        const fullPathStr = fullPath.join('/');

        paths.push(fullPathStr); // Every key, regardless of children, is selectable

        // Recurse only into non-array objects with keys
        if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
            paths = paths.concat(collectAllPaths(value, fullPath));
        }
    }

    return paths;
}

export function collectAllLeafs(node: object, path: string[] = []): string[] {
    let paths: string[] = [];

    if (Array.isArray(node) || typeof node === 'string') {
        // Add the full path of the leaf to the Array
        paths.push(path.join('/'));
    } else if (node && typeof node === 'object') {
        for (const key in node) {
            const child = node[key];
            const childPath = [...path, key];
            const childPaths = collectAllLeafs(child, childPath);
            paths.push(...childPaths);
        }
    }

    return paths
}