
package org.example;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.OutputStream;
import java.io.IOException;

public class OnlineFoodOrdering {

    public static void main(String[] args) throws IOException {

        Path websiteDir = Path.of("website")
                .toAbsolutePath()
                .normalize();

        HttpServer server = HttpServer.create(
                new InetSocketAddress(5500), 0
        );

        server.createContext("/", exchange -> {

            String requestPath = exchange.getRequestURI().getPath();

            if (requestPath.equals("/")) {
                requestPath = "/index.html";
            }

            Path file = websiteDir.resolve(
                    requestPath.substring(1)
            ).normalize();

            if (!file.startsWith(websiteDir)) {
                exchange.sendResponseHeaders(403, -1);
                exchange.close();
                return;
            }

            if (!Files.exists(file) || Files.isDirectory(file)) {
                exchange.sendResponseHeaders(404, -1);
                exchange.close();
                return;
            }

            String name = file.getFileName().toString();

            String extension = name.substring(
                    name.lastIndexOf('.') + 1
            );

            String contentType = switch (extension) {
                case "html" -> "text/html; charset=UTF-8";
                case "css" -> "text/css; charset=UTF-8";
                case "js" -> "application/javascript; charset=UTF-8";
                default -> "application/octet-stream";
            };

            byte[] data = Files.readAllBytes(file);

            exchange.getResponseHeaders().set(
                    "Content-Type", contentType
            );

            exchange.sendResponseHeaders(200, data.length);

            try (OutputStream output = exchange.getResponseBody()) {
                output.write(data);
            }
        });

        server.start();

        System.out.println(
                "Food Ordering Website running at http://localhost:5500"
        );
    }
}
