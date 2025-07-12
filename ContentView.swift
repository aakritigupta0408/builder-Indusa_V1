import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authManager: AuthManager
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        Group {
            if authManager.isAuthenticated {
                MainTabView()
            } else {
                LoginView()
            }
        }
        .animation(.easeInOut, value: authManager.isAuthenticated)
    }
}

struct MainTabView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        TabView(selection: $appState.selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
                .tag(0)
            
            ApparelView()
                .tabItem {
                    Image(systemName: "tshirt.fill")
                    Text("Apparel")
                }
                .tag(1)
            
            HomeDecorView()
                .tabItem {
                    Image(systemName: "sofa.fill")
                    Text("Home & Decor")
                }
                .tag(2)
            
            TryOnView()
                .tabItem {
                    Image(systemName: "sparkles")
                    Text("Try-On")
                }
                .tag(3)
            
            WardrobeView()
                .tabItem {
                    Image(systemName: "person.crop.square")
                    Text("Wardrobe")
                }
                .tag(4)
        }
        .accentColor(.indusaPrimary)
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
        .environmentObject(AuthManager())
        .environmentObject(CartManager())
        .environmentObject(WardrobeManager())
}
