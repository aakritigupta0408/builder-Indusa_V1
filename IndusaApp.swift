import SwiftUI

@main
struct IndusaApp: App {
    @StateObject private var appState = AppState()
    @StateObject private var authManager = AuthManager()
    @StateObject private var cartManager = CartManager()
    @StateObject private var wardrobeManager = WardrobeManager()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .environmentObject(authManager)
                .environmentObject(cartManager)
                .environmentObject(wardrobeManager)
                .preferredColorScheme(.light)
        }
    }
}

// MARK: - App State Management
class AppState: ObservableObject {
    @Published var selectedTab: Int = 0
    @Published var isSearchActive: Bool = false
    @Published var searchQuery: String = ""
    @Published var selectedProduct: Product?
    @Published var isProcessing: Bool = false
    @Published var tryOnMode: TryOnMode = .clothing
    @Published var userPhoto: UIImage?
    @Published var roomPhoto: UIImage?
    @Published var previewImage: UIImage?
    
    enum TryOnMode {
        case clothing, decor
    }
}
