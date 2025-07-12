import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var cartManager: CartManager
    @State private var showingSearch = false
    @State private var showingNotifications = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                ScrollView {
                    LazyVStack(spacing: 24) {
                        // Enhanced Header - Much cleaner than website
                        headerSection
                        
                        // Quick Actions - Easier access than website navigation
                        quickActionsSection
                        
                        // Hero Section - Simplified
                        heroSection
                        
                        // Featured Products - Larger, easier to browse
                        featuredProductsSection
                        
                        // AI Features Showcase
                        aiFeatureSection
                    }
                    .padding(.horizontal)
                }
                .refreshable {
                    // Pull to refresh - native mobile pattern
                }
            }
            .navigationBarHidden(true)
        }
        .sheet(isPresented: $showingSearch) {
            EnhancedSearchView()
        }
    }
    
    private var headerSection: some View {
        HStack {
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text("INDUSA")
                        .font(.system(size: 28, weight: .black, design: .default))
                        .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                    
                    Spacer()
                    
                    // Larger, easier-to-tap buttons
                    HStack(spacing: 16) {
                        Button(action: { showingSearch = true }) {
                            Image(systemName: "magnifyingglass")
                                .font(.title2)
                                .foregroundColor(.indusaPrimary)
                                .frame(width: 44, height: 44)
                                .background(Color.indusaPrimary.opacity(0.1))
                                .clipShape(Circle())
                        }
                        
                        Button(action: { showingNotifications = true }) {
                            ZStack {
                                Image(systemName: "bell")
                                    .font(.title2)
                                    .foregroundColor(.indusaPrimary)
                                    .frame(width: 44, height: 44)
                                    .background(Color.indusaPrimary.opacity(0.1))
                                    .clipShape(Circle())
                                
                                // Notification badge
                                Circle()
                                    .fill(Color.red)
                                    .frame(width: 8, height: 8)
                                    .offset(x: 8, y: -8)
                            }
                        }
                        
                        NavigationLink(destination: CartView()) {
                            ZStack {
                                Image(systemName: "bag")
                                    .font(.title2)
                                    .foregroundColor(.indusaPrimary)
                                    .frame(width: 44, height: 44)
                                    .background(Color.indusaPrimary.opacity(0.1))
                                    .clipShape(Circle())
                                
                                if cartManager.totalItems > 0 {
                                    Text("\(cartManager.totalItems)")
                                        .font(.caption2)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .frame(width: 18, height: 18)
                                        .background(Color.red)
                                        .clipShape(Circle())
                                        .offset(x: 12, y: -12)
                                }
                            }
                        }
                    }
                }
                
                Text("Made by Humans • Delivered By AI")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.indusaTextSecondary)
                    .textCase(.uppercase)
                    .tracking(0.5)
            }
        }
        .padding(.top, 8)
    }
    
    // Quick Actions - Much faster than navigating through website menus
    private var quickActionsSection: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 16) {
                QuickActionCard(
                    icon: "sparkles",
                    title: "Try-On",
                    subtitle: "AI Magic",
                    gradient: LinearGradient.indusaGradientHorizontal,
                    action: { appState.selectedTab = 2 }
                )
                
                QuickActionCard(
                    icon: "square.grid.2x2",
                    title: "Shop All",
                    subtitle: "Browse",
                    gradient: LinearGradient(colors: [.blue, .purple], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: { appState.selectedTab = 1 }
                )
                
                QuickActionCard(
                    icon: "person.crop.square",
                    title: "Wardrobe",
                    subtitle: "My Style",
                    gradient: LinearGradient(colors: [.green, .mint], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: { appState.selectedTab = 3 }
                )
                
                QuickActionCard(
                    icon: "wand.and.stars",
                    title: "AI Styling",
                    subtitle: "Smart Mix",
                    gradient: LinearGradient(colors: [.orange, .pink], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: { /* AI Styling */ }
                )
            }
            .padding(.horizontal)
        }
    }
    
    private var heroSection: some View {
        VStack(spacing: 20) {
            VStack(spacing: 12) {
                Text("✨ AI-Powered Fashion")
                    .font(.title)
                    .fontWeight(.bold)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.indusaTextPrimary)
                
                Text("Try before you buy with our advanced virtual try-on technology")
                    .font(.body)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.indusaTextSecondary)
                    .padding(.horizontal, 20)
            }
            
            // Large, prominent CTA button
            Button(action: { appState.selectedTab = 2 }) {
                HStack(spacing: 12) {
                    Image(systemName: "sparkles")
                        .font(.title3)
                    Text("Start Virtual Try-On")
                        .font(.headline)
                        .fontWeight(.semibold)
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 56)
                .background(LinearGradient.indusaGradientHorizontal)
                .cornerRadius(16)
                .shadow(color: .indusaPrimary.opacity(0.3), radius: 8, x: 0, y: 4)
            }
        }
        .padding(.vertical, 30)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(LinearGradient.indusaGradient.opacity(0.05))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(LinearGradient.indusaGradientHorizontal.opacity(0.2), lineWidth: 1)
                )
        )
    }
    
    private var featuredProductsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("✨ Trending Now")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                Button("See All") {
                    appState.selectedTab = 1
                }
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.indusaPrimary)
            }
            
            // Horizontal scroll with larger product cards
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(Array(MockData.sampleProducts.prefix(4).enumerated()), id: \.offset) { index, product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            FeaturedProductCard(product: product, index: index)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal)
            }
        }
    }
    
    private var aiFeatureSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("🚀 Why Choose Indusa")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            VStack(spacing: 12) {
                AIFeatureRow(
                    icon: "brain",
                    title: "Smart AI Recommendations",
                    description: "Get personalized suggestions based on your style"
                )
                
                AIFeatureRow(
                    icon: "camera.viewfinder",
                    title: "Perfect Fit Guarantee",
                    description: "Virtual try-on ensures the right size every time"
                )
                
                AIFeatureRow(
                    icon: "leaf",
                    title: "Sustainable Shopping",
                    description: "Reduce returns and environmental impact"
                )
                
                AIFeatureRow(
                    icon: "heart",
                    title: "Love It or Return It",
                    description: "30-day hassle-free returns on all items"
                )
            }
        }
    }
}

// MARK: - Supporting Components

struct QuickActionCard: View {
    let icon: String
    let title: String
    let subtitle: String
    let gradient: LinearGradient
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                ZStack {
                    Circle()
                        .fill(gradient)
                        .frame(width: 50, height: 50)
                    
                    Image(systemName: icon)
                        .font(.title2)
                        .foregroundColor(.white)
                }
                
                VStack(spacing: 2) {
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
            }
            .frame(width: 90)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

struct FeaturedProductCard: View {
    let product: Product
    let index: Int
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            ZStack(alignment: .topLeading) {
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .overlay(
                            ProgressView()
                        )
                }
                .frame(width: 180, height: 220)
                .clipped()
                .cornerRadius(16)
                
                // Trending badge
                if index < 2 {
                    Text("🔥 Hot")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.orange)
                        .cornerRadius(8)
                        .padding(12)
                }
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(product.name)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .lineLimit(2)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(product.brand)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                Text(product.formattedPrice)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaPrimary)
            }
            
            // Quick action buttons
            HStack(spacing: 8) {
                Button(action: { cartManager.addToCart(product) }) {
                    Image(systemName: "bag.badge.plus")
                        .font(.caption)
                        .foregroundColor(.white)
                        .frame(width: 32, height: 32)
                        .background(Color.indusaPrimary)
                        .clipShape(Circle())
                }
                
                Button(action: { /* Try-On */ }) {
                    Image(systemName: "sparkles")
                        .font(.caption)
                        .foregroundColor(.indusaPrimary)
                        .frame(width: 32, height: 32)
                        .background(Color.indusaPrimary.opacity(0.1))
                        .clipShape(Circle())
                }
                
                Spacer()
                
                Button(action: { cartManager.addToWishlist(product) }) {
                    Image(systemName: cartManager.isInWishlist(product) ? "heart.fill" : "heart")
                        .font(.caption)
                        .foregroundColor(cartManager.isInWishlist(product) ? .red : .indusaTextSecondary)
                }
            }
        }
        .frame(width: 180)
        .padding(12)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 6, x: 0, y: 3)
    }
}

struct AIFeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.indusaPrimary)
                .frame(width: 40, height: 40)
                .background(Color.indusaPrimary.opacity(0.1))
                .clipShape(Circle())
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(description)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                    .lineLimit(2)
            }
            
            Spacer()
        }
        .padding()
        .background(Color.white)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 2)
    }
}

// MARK: - Enhanced Search View
struct EnhancedSearchView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var searchText = ""
    @State private var searchResults: [Product] = []
    @State private var recentSearches = ["Denim Jacket", "White Sneakers", "Home Decor"]
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Large search bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .font(.title2)
                        .foregroundColor(.indusaTextSecondary)
                    
                    TextField("Search for anything...", text: $searchText)
                        .font(.body)
                        .textFieldStyle(PlainTextFieldStyle())
                        .onSubmit {
                            performSearch()
                        }
                    
                    if !searchText.isEmpty {
                        Button(action: { searchText = "" }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.title2)
                                .foregroundColor(.indusaTextSecondary)
                        }
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(12)
                .padding()
                
                if searchText.isEmpty {
                    // Recent searches and quick categories
                    VStack(alignment: .leading, spacing: 16) {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Recent Searches")
                                .font(.subheadline)
                                .fontWeight(.semibold)
                                .foregroundColor(.indusaTextPrimary)
                            
                            ForEach(recentSearches, id: \.self) { search in
                                Button(action: { searchText = search; performSearch() }) {
                                    HStack {
                                        Image(systemName: "clock")
                                            .foregroundColor(.indusaTextSecondary)
                                        Text(search)
                                            .foregroundColor(.indusaTextPrimary)
                                        Spacer()
                                    }
                                    .padding(.vertical, 8)
                                }
                            }
                        }
                        
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Popular Categories")
                                .font(.subheadline)
                                .fontWeight(.semibold)
                                .foregroundColor(.indusaTextPrimary)
                            
                            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 12) {
                                SearchCategoryCard(title: "👗 Dresses", action: { searchText = "dresses"; performSearch() })
                                SearchCategoryCard(title: "👟 Sneakers", action: { searchText = "sneakers"; performSearch() })
                                SearchCategoryCard(title: "🏠 Home Decor", action: { searchText = "home decor"; performSearch() })
                                SearchCategoryCard(title: "👔 Business", action: { searchText = "business"; performSearch() })
                            }
                        }
                        
                        Spacer()
                    }
                    .padding()
                } else {
                    // Search results
                    ScrollView {
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                            ForEach(searchResults) { product in
                                NavigationLink(destination: ProductDetailView(product: product)) {
                                    EnhancedProductCard(product: product)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Search")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
        .onAppear {
            searchResults = Array(MockData.sampleProducts.shuffled().prefix(6))
        }
        .onChange(of: searchText) { _ in
            if !searchText.isEmpty {
                performSearch()
            }
        }
    }
    
    private func performSearch() {
        searchResults = MockData.sampleProducts.filter { product in
            product.name.localizedCaseInsensitiveContains(searchText) ||
            product.brand.localizedCaseInsensitiveContains(searchText) ||
            product.color.localizedCaseInsensitiveContains(searchText)
        }
    }
}

struct SearchCategoryCard: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.indusaTextPrimary)
                .frame(maxWidth: .infinity)
                .frame(height: 44)
                .background(Color.indusaPrimary.opacity(0.1))
                .cornerRadius(12)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    HomeView()
        .environmentObject(AppState())
        .environmentObject(CartManager())
}
