mod graph;

use axum::{routing::post, Router};
use graph::handle_request;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/color_graph", post(handle_request));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8008").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
