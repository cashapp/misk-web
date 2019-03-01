export const config = {
  resources: {
    "Effective Config":
      'web:\n  port: 8080\n  idle_timeout: 30000\ndata_source_clusters:\n  cash-urlshortener-001:\n    writer:\n      type: "MYSQL"\n      username: "root"\n      password: ████████\n      database: "urls"\n      migrations_resource: "classpath:/migrations"\nendpoint:\n  base_url: "http://localhost:8080/"\nhttp_clients:\n  endpoints:\n    for_shortened_urls:\n      url: "https://localhost/"\n',
    "classpath:/cash-urlshortener-common.yaml":
      "web:\n  port: 8080\n  idle_timeout: 30000\n\ndata_source_clusters:\n  cash-urlshortener-001:\n    writer:\n      type: MYSQL\n      username: root\n      password: ████████\n      database: urls\n      migrations_resource: classpath:/migrations\n\nendpoint:\n  base_url: http://localhost:8080/\n\nhttp_clients:\n  endpoints:\n    for_shortened_urls:\n      url: https://localhost/\n"
  }
}
