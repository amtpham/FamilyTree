"use client"

import React from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { Person } from "@/lib/types";

type Props = { people: Person[]; onSelect?: (person: Person) => void };

function buildGraph(people: Person[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const idToIndex = new Map<string, number>();
  const columns = Math.ceil(Math.sqrt(people.length || 1));
  people.forEach((p, idx) => {
    idToIndex.set(p.id, idx);
    const row = Math.floor(idx / columns);
    const col = idx % columns;
    nodes.push({
      id: p.id,
      position: { x: col * 200, y: row * 120 },
      data: { label: p.name },
      style: { padding: 8, borderRadius: 8, background: "white", border: "1px solid #ddd" },
    });
  });
  const seen = new Set<string>();
  people.forEach((p) => {
    p.children.forEach((childId) => {
      const edgeId = p.id + "-" + childId;
      if (!seen.has(edgeId) && idToIndex.has(p.id) && idToIndex.has(childId)) {
        edges.push({ id: edgeId, source: p.id, target: childId, animated: false });
        seen.add(edgeId);
      }
    });
  });
  return { nodes, edges };
}

export default function FamilyGraph({ people, onSelect }: Props) {
  const { nodes, edges } = React.useMemo(() => buildGraph(people), [people]);
  const onNodeClick = React.useCallback((_e: any, node: any) => {
    const person = people.find((p) => p.id === node.id);
    if (person && onSelect) onSelect(person);
  }, [people, onSelect]);

  return (
    <div style={{ width: "100%", height: 600 }} className="border rounded-md bg-white">
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
