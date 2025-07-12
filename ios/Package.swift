// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "IndusaApp",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "IndusaApp",
            targets: ["IndusaApp"]
        ),
    ],
    dependencies: [
        // Add any external dependencies here
        // Example: .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.0.0")
    ],
    targets: [
        .target(
            name: "IndusaApp",
            dependencies: [],
            path: "Sources",
            resources: [
                .process("Resources")
            ]
        ),
        .testTarget(
            name: "IndusaAppTests",
            dependencies: ["IndusaApp"],
            path: "Tests"
        ),
    ]
)
