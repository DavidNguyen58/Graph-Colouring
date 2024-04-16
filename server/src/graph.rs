use std::collections::{HashMap, HashSet};
use petgraph::graphmap::UnGraphMap;

const COLORS: [&str; 4] = ["red", "blue", "green", "yellow"];

pub async fn handle_request(body: String) -> String {
    let nodes_and_neighbors: HashMap<&str, Vec<&str>> = serde_json::from_str(&body).expect("Request body should be a valid JSON.");
    let node_colors: HashMap<&str, &str> = nodes_and_neighbors.keys().map(|node| (*node, "")).collect();

    let mut edges: Vec<(&str, &str)> = vec![];

    for (node, neighbors) in nodes_and_neighbors {
        let edges_for_node = neighbors.iter().map(|adjacent| (node, *adjacent));
        edges.extend(edges_for_node);
    }

    let graph = UnGraphMap::<_, ()>::from_edges(&edges);

    let node_colors = welsh_powell(graph, node_colors);
    serde_json::to_string(&node_colors).unwrap()
}

fn welsh_powell<'a>(graph: UnGraphMap<&'a str, ()>, mut node_colors: HashMap<&'a str, &'a str>) -> HashMap<&'a str, &'a str> {

    let nodes: HashSet<&str> = graph.nodes().collect();

    let mut node_degrees: Vec<(&str, usize)> = graph.nodes().map(|node| (node, graph.neighbors(node).count())).collect();
    node_degrees.sort_by(|a, b| a.1.cmp(&b.1));

    let mut i = 0;

    while node_colors.values().any(|x| x.is_empty()) {
        let color = COLORS[i];

        let largest_degree_node = node_degrees.pop().unwrap();
        let neighbors: HashSet<&str> = graph.neighbors(largest_degree_node.0).collect();
        let non_neighbors: HashSet<_> = nodes.difference(&neighbors).collect();

        node_colors.insert(largest_degree_node.0, color);
        for non_neighbor in non_neighbors {
            node_colors.insert(non_neighbor, color);
        }

        i += 1;
    }

    node_colors
}
