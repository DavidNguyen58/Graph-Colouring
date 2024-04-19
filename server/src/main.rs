mod graph;

use axum::{
    http::{header::CONTENT_TYPE, Method}, routing::post, Router
};
use graph::handle_request;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_methods([Method::POST])
        .allow_origin(Any)
        .allow_headers([CONTENT_TYPE]);

    let app = Router::new()
        .route("/color_graph", post(handle_request))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8008").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
