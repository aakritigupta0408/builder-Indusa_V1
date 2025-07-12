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
                    VStack {
                        Image(systemName: "house.fill")
                            .font(.title2)
                        Text("Home")
                            .font(.caption)
                    }
                }
                .tag(0)
            
            CatalogView()
                .tabItem {
                    VStack {
                        Image(systemName: "square.grid.2x2")
                            .font(.title2)
                        Text("Shop")
                            .font(.caption)
                    }
                }
                .tag(1)
            
            TryOnView()
                .tabItem {
                    VStack {
                        ZStack {
                            Circle()
                                .fill(LinearGradient.indusaGradientHorizontal)
                                .frame(width: 45, height: 45)
                            Image(systemName: "sparkles")
                                .font(.title2)
                                .foregroundColor(.white)
                        }
                        Text("Try-On")
                            .font(.caption)
                    }
                }
                .tag(2)
            
            WardrobeView()
                .tabItem {
                    VStack {
                        Image(systemName: "person.crop.square")
                            .font(.title2)
                        Text("Wardrobe")
                            .font(.caption)
                    }
                }
                .tag(3)
            
            ProfileView()
                .tabItem {
                    VStack {
                        Image(systemName: "person.circle")
                            .font(.title2)
                        Text("Profile")
                            .font(.caption)
                    }
                }
                .tag(4)
        }
        .accentColor(.indusaPrimary)
        .onAppear {
            // Enhanced tab bar for better thumb access
            let tabBarAppearance = UITabBarAppearance()
            tabBarAppearance.backgroundColor = UIColor.white
            tabBarAppearance.shadowColor = UIColor.black.withAlphaComponent(0.1)
            
            UITabBar.appearance().standardAppearance = tabBarAppearance
            UITabBar.appearance().scrollEdgeAppearance = tabBarAppearance
        }
    }
}

// MARK: - Unified Catalog View (combines Apparel & Home Decor)
struct CatalogView: View {
    @State private var selectedCategory: ProductCategory? = nil
    @State private var searchText = ""
    @State private var showingFilters = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Quick Category Selector - Much easier than website
                categoryQuickSelector
                
                // Search Bar - Larger and more accessible
                searchSection
                
                // Products Grid
                ScrollView {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 16), count: 2), spacing: 20) {
                        ForEach(filteredProducts) { product in
                            NavigationLink(destination: ProductDetailView(product: product)) {
                                EnhancedProductCard(product: product)
                            }
                            .buttonStyle(PlainButtonStyle())
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Shop")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var categoryQuickSelector: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 16) {
                CategoryChip(
                    title: "All",
                    isSelected: selectedCategory == nil,
                    action: { selectedCategory = nil }
                )
                
                CategoryChip(
                    title: "Clothing",
                    isSelected: selectedCategory == .clothing,
                    action: { selectedCategory = .clothing }
                )
                
                CategoryChip(
                    title: "Home Decor",
                    isSelected: selectedCategory == .decor,
                    action: { selectedCategory = .decor }
                )
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 12)
    }
    
    private var searchSection: some View {
        HStack(spacing: 12) {
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.indusaTextSecondary)
                    .font(.title3)
                
                TextField("Search everything...", text: $searchText)
                    .font(.body)
                    .textFieldStyle(PlainTextFieldStyle())
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .background(Color.gray.opacity(0.1))
            .cornerRadius(12)
            
            Button(action: { showingFilters = true }) {
                Image(systemName: "slider.horizontal.3")
                    .font(.title2)
                    .foregroundColor(.indusaPrimary)
                    .frame(width: 44, height: 44)
                    .background(Color.indusaPrimary.opacity(0.1))
                    .cornerRadius(12)
            }
        }
        .padding(.horizontal)
        .padding(.bottom, 8)
    }
    
    private var filteredProducts: [Product] {
        var products = MockData.sampleProducts
        
        if let category = selectedCategory {
            products = products.filter { $0.category == category }
        }
        
        if !searchText.isEmpty {
            products = products.filter {
                $0.name.localizedCaseInsensitiveContains(searchText) ||
                $0.brand.localizedCaseInsensitiveContains(searchText)
            }
        }
        
        return products
    }
}

struct CategoryChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(isSelected ? .white : .indusaPrimary)
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                .background(isSelected ? LinearGradient.indusaGradientHorizontal : AnyView(Color.clear))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(Color.indusaPrimary, lineWidth: isSelected ? 0 : 1)
                )
                .cornerRadius(20)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - Enhanced Product Card (Larger, easier to tap)
struct EnhancedProductCard: View {
    let product: Product
    @EnvironmentObject var cartManager: CartManager
    @State private var isAddedToCart = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Product Image - Larger for easier viewing
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .overlay(
                            ProgressView()
                                .scaleEffect(1.5)
                        )
                }
                .frame(height: 200)
                .clipped()
                .cornerRadius(16)
                
                // Wishlist Button - Larger touch target
                VStack {
                    HStack {
                        Spacer()
                        Button(action: toggleWishlist) {
                            Image(systemName: cartManager.isInWishlist(product) ? "heart.fill" : "heart")
                                .font(.title2)
                                .foregroundColor(cartManager.isInWishlist(product) ? .red : .white)
                                .frame(width: 40, height: 40)
                                .background(Color.black.opacity(0.6))
                                .clipShape(Circle())
                        }
                        .padding(12)
                    }
                    Spacer()
                }
            }
            
            VStack(alignment: .leading, spacing: 6) {
                Text(product.name)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .lineLimit(2)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(product.brand)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                Text(product.formattedPrice)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaPrimary)
            }
            
            // Large, easy-to-tap action buttons
            VStack(spacing: 8) {
                Button(action: addToCart) {
                    HStack {
                        Image(systemName: isAddedToCart ? "checkmark" : "bag.badge.plus")
                            .font(.subheadline)
                        Text(isAddedToCart ? "Added!" : "Add to Cart")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .background(isAddedToCart ? Color.green : Color.indusaPrimary)
                    .cornerRadius(12)
                }
                .animation(.easeInOut(duration: 0.2), value: isAddedToCart)
                
                Button(action: { /* Try-On */ }) {
                    HStack {
                        Image(systemName: "sparkles")
                            .font(.subheadline)
                        Text("Try On")
                            .font(.subheadline)
                            .fontWeight(.medium)
                    }
                    .foregroundColor(.indusaPrimary)
                    .frame(maxWidth: .infinity)
                    .frame(height: 36)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.indusaPrimary, lineWidth: 1)
                    )
                }
            }
        }
        .padding(12)
        .background(Color.white)
        .cornerRadius(20)
        .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
    
    private func addToCart() {
        cartManager.addToCart(product)
        isAddedToCart = true
        
        // Haptic feedback
        let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
        impactFeedback.impactOccurred()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isAddedToCart = false
        }
    }
    
    private func toggleWishlist() {
        if cartManager.isInWishlist(product) {
            cartManager.removeFromWishlist(product)
        } else {
            cartManager.addToWishlist(product)
        }
        
        // Haptic feedback
        let impactFeedback = UIImpactFeedbackGenerator(style: .light)
        impactFeedback.impactOccurred()
    }
}

// MARK: - Profile View
struct ProfileView: View {
    @EnvironmentObject var authManager: AuthManager
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // User Profile Header
                    VStack(spacing: 16) {
                        if let user = authManager.currentUser {
                            AsyncImage(url: URL(string: user.avatarURL ?? "")) { image in
                                image
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Circle()
                                    .fill(LinearGradient.indusaGradientHorizontal)
                                    .overlay(
                                        Text(String(user.name.prefix(1)))
                                            .font(.largeTitle)
                                            .fontWeight(.bold)
                                            .foregroundColor(.white)
                                    )
                            }
                            .frame(width: 80, height: 80)
                            .clipShape(Circle())
                            
                            Text(user.name)
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.indusaTextPrimary)
                            
                            Text(user.email)
                                .font(.subheadline)
                                .foregroundColor(.indusaTextSecondary)
                        }
                    }
                    .padding(.vertical)
                    
                    // Quick Stats
                    HStack(spacing: 20) {
                        StatCard(title: "Cart Items", value: "\(cartManager.totalItems)")
                        StatCard(title: "Wishlist", value: "\(cartManager.wishlist.count)")
                        StatCard(title: "Orders", value: "3")
                    }
                    
                    // Menu Options with larger touch targets
                    VStack(spacing: 16) {
                        ProfileMenuItem(icon: "bag", title: "My Orders", subtitle: "Track your purchases")
                        ProfileMenuItem(icon: "heart", title: "Wishlist", subtitle: "Saved items")
                        ProfileMenuItem(icon: "bell", title: "Notifications", subtitle: "App preferences")
                        ProfileMenuItem(icon: "questionmark.circle", title: "Help & Support", subtitle: "Get assistance")
                        ProfileMenuItem(icon: "gear", title: "Settings", subtitle: "Account & privacy")
                    }
                    
                    // Sign Out Button
                    Button(action: { authManager.signOut() }) {
                        Text("Sign Out")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .frame(height: 50)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.red, lineWidth: 1)
                            )
                    }
                    .padding(.top, 20)
                }
                .padding()
            }
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

struct StatCard: View {
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 8) {
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaPrimary)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.indusaTextSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.indusaPrimary.opacity(0.1))
        .cornerRadius(12)
    }
}

struct ProfileMenuItem: View {
    let icon: String
    let title: String
    let subtitle: String
    
    var body: some View {
        Button(action: {}) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(.indusaPrimary)
                    .frame(width: 32, height: 32)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.subheadline)
                    .foregroundColor(.indusaTextSecondary)
            }
            .padding()
            .background(Color.white)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
        .environmentObject(AuthManager())
        .environmentObject(CartManager())
        .environmentObject(WardrobeManager())
}
