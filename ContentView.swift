import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authManager: AuthManager
    @EnvironmentObject var appState: AppState
    @State private var showingIntroduction = true
    
    var body: some View {
        Group {
            if showingIntroduction && !authManager.hasSeenIntroduction {
                IntroductionView(onComplete: {
                    showingIntroduction = false
                    authManager.hasSeenIntroduction = true
                })
            } else {
                MainAppView()
            }
        }
        .animation(.easeInOut(duration: 0.5), value: showingIntroduction)
    }
}

// MARK: - Introduction/Welcome Screen
struct IntroductionView: View {
    let onComplete: () -> Void
    @State private var currentPage = 0
    @State private var showingGetStarted = false
    
    private let introPages = [
        IntroPage(
            title: "Welcome to INDUSA",
            subtitle: "AI-Powered Fashion & Home Decor",
            description: "Experience the future of shopping with our cutting-edge virtual try-on technology",
            imageName: "sparkles",
            gradient: LinearGradient.indusaGradient
        ),
        IntroPage(
            title: "Virtual Try-On Magic",
            subtitle: "See Before You Buy",
            description: "Use AI to try on clothes and visualize home decor in your space - no more guessing!",
            imageName: "camera.viewfinder",
            gradient: LinearGradient(colors: [.purple, .pink], startPoint: .topLeading, endPoint: .bottomTrailing)
        ),
        IntroPage(
            title: "Smart Shopping",
            subtitle: "Personalized Just for You",
            description: "Get AI-powered recommendations and create your perfect wardrobe effortlessly",
            imageName: "brain.head.profile",
            gradient: LinearGradient(colors: [.blue, .cyan], startPoint: .topLeading, endPoint: .bottomTrailing)
        )
    ]
    
    var body: some View {
        ZStack {
            // Background gradient that changes with pages
            introPages[currentPage].gradient
                .ignoresSafeArea()
                .animation(.easeInOut(duration: 0.5), value: currentPage)
            
            VStack(spacing: 0) {
                Spacer()
                
                // Page content
                VStack(spacing: 32) {
                    // Icon with animation
                    ZStack {
                        Circle()
                            .fill(Color.white.opacity(0.2))
                            .frame(width: 120, height: 120)
                        
                        Image(systemName: introPages[currentPage].imageName)
                            .font(.system(size: 50))
                            .foregroundColor(.white)
                    }
                    .scaleEffect(showingGetStarted ? 1.1 : 1.0)
                    .animation(.easeInOut(duration: 0.3), value: currentPage)
                    
                    // Text content
                    VStack(spacing: 16) {
                        Text(introPages[currentPage].title)
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .multilineTextAlignment(.center)
                        
                        Text(introPages[currentPage].subtitle)
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.white.opacity(0.9))
                            .multilineTextAlignment(.center)
                        
                        Text(introPages[currentPage].description)
                            .font(.body)
                            .foregroundColor(.white.opacity(0.8))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 32)
                    }
                }
                
                Spacer()
                
                // Navigation controls
                VStack(spacing: 32) {
                    // Page indicators
                    HStack(spacing: 12) {
                        ForEach(0..<introPages.count, id: \.self) { index in
                            Circle()
                                .fill(currentPage == index ? Color.white : Color.white.opacity(0.3))
                                .frame(width: currentPage == index ? 12 : 8, height: currentPage == index ? 12 : 8)
                                .animation(.easeInOut(duration: 0.3), value: currentPage)
                        }
                    }
                    
                    // Action buttons
                    if currentPage < introPages.count - 1 {
                        HStack(spacing: 20) {
                            Button("Skip") {
                                onComplete()
                            }
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                            
                            Spacer()
                            
                            Button(action: nextPage) {
                                HStack(spacing: 8) {
                                    Text("Next")
                                        .fontWeight(.semibold)
                                    Image(systemName: "arrow.right")
                                }
                                .foregroundColor(.black)
                                .padding(.horizontal, 32)
                                .padding(.vertical, 12)
                                .background(Color.white)
                                .cornerRadius(25)
                            }
                        }
                        .padding(.horizontal, 32)
                    } else {
                        Button(action: {
                            showingGetStarted = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                onComplete()
                            }
                        }) {
                            HStack(spacing: 12) {
                                Text("Get Started")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                Image(systemName: "sparkles")
                            }
                            .foregroundColor(.black)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .background(Color.white)
                            .cornerRadius(16)
                            .scaleEffect(showingGetStarted ? 0.95 : 1.0)
                            .animation(.easeInOut(duration: 0.1), value: showingGetStarted)
                        }
                        .padding(.horizontal, 32)
                    }
                }
                .padding(.bottom, 50)
            }
        }
        .onTapGesture {
            if currentPage < introPages.count - 1 {
                nextPage()
            }
        }
    }
    
    private func nextPage() {
        withAnimation(.easeInOut(duration: 0.5)) {
            currentPage = min(currentPage + 1, introPages.count - 1)
        }
    }
}

struct IntroPage {
    let title: String
    let subtitle: String
    let description: String
    let imageName: String
    let gradient: LinearGradient
}

// MARK: - Main App with Simplified Navigation
struct MainAppView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        TabView(selection: $appState.selectedTab) {
            // Home Feed
            HomeFeedView()
                .tabItem {
                    VStack {
                        Image(systemName: "house.fill")
                            .font(.title2)
                        Text("Home")
                            .font(.caption)
                    }
                }
                .tag(0)
            
            // Shop (Combined Apparel & Home)
            ShopView()
                .tabItem {
                    VStack {
                        Image(systemName: "bag.fill")
                            .font(.title2)
                        Text("Shop")
                            .font(.caption)
                    }
                }
                .tag(1)
            
            // User Hub (Everything user-related)
            UserHubView()
                .tabItem {
                    VStack {
                        Image(systemName: "person.circle.fill")
                            .font(.title2)
                        Text("You")
                            .font(.caption)
                    }
                }
                .tag(2)
        }
        .accentColor(.indusaPrimary)
    }
}

// MARK: - Home Feed View
struct HomeFeedView: View {
    @EnvironmentObject var cartManager: CartManager
    @State private var showingSearch = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                ScrollView {
                    LazyVStack(spacing: 24) {
                        // Brand Header
                        brandHeader
                        
                        // Today's Highlights
                        todaysHighlights
                        
                        // Trending Products
                        trendingSection
                        
                        // Categories Quick Access
                        categoriesSection
                        
                        // Featured Collections
                        featuredCollections
                    }
                    .padding(.horizontal)
                }
                .refreshable {
                    // Pull to refresh
                }
            }
            .navigationBarHidden(true)
        }
        .sheet(isPresented: $showingSearch) {
            SearchView()
        }
    }
    
    private var brandHeader: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("INDUSA")
                    .font(.system(size: 32, weight: .black))
                    .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                
                Text("AI-Powered Shopping")
                    .font(.subheadline)
                    .foregroundColor(.indusaTextSecondary)
            }
            
            Spacer()
            
            HStack(spacing: 12) {
                Button(action: { showingSearch = true }) {
                    Image(systemName: "magnifyingglass")
                        .font(.title2)
                        .foregroundColor(.indusaPrimary)
                        .frame(width: 44, height: 44)
                        .background(Color.indusaPrimary.opacity(0.1))
                        .clipShape(Circle())
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
        .padding(.top, 8)
    }
    
    private var todaysHighlights: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("✨ Today's Highlights")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    HighlightCard(
                        title: "New Arrivals",
                        subtitle: "Fresh styles just in",
                        imageName: "sparkles",
                        color: .indusaPrimary
                    )
                    
                    HighlightCard(
                        title: "Virtual Try-On",
                        subtitle: "See before you buy",
                        imageName: "camera.viewfinder",
                        color: .purple
                    )
                    
                    HighlightCard(
                        title: "AI Styling",
                        subtitle: "Smart recommendations",
                        imageName: "brain",
                        color: .blue
                    )
                }
                .padding(.horizontal)
            }
        }
    }
    
    private var trendingSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("🔥 Trending Now")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                Button("See All") {
                    // Navigate to shop
                }
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.indusaPrimary)
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(Array(MockData.sampleProducts.prefix(5).enumerated()), id: \.offset) { index, product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            CompactProductCard(product: product, showTrending: index < 2)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal)
            }
        }
    }
    
    private var categoriesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("🛍️ Shop by Category")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            HStack(spacing: 16) {
                CategoryCard(
                    title: "Fashion",
                    subtitle: "Clothing & Style",
                    icon: "tshirt.fill",
                    gradient: LinearGradient(colors: [.pink, .purple], startPoint: .topLeading, endPoint: .bottomTrailing)
                )
                
                CategoryCard(
                    title: "Home",
                    subtitle: "Decor & Living",
                    icon: "house.fill",
                    gradient: LinearGradient(colors: [.blue, .cyan], startPoint: .topLeading, endPoint: .bottomTrailing)
                )
            }
        }
    }
    
    private var featuredCollections: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("🎨 Featured Collections")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            CollectionCard(
                title: "Summer Essentials",
                description: "Light, breezy styles for the season",
                imageUrl: MockData.sampleProducts[0].imageURL,
                itemCount: 24
            )
            
            CollectionCard(
                title: "Smart Home Setup",
                description: "Modern decor for contemporary living",
                imageUrl: MockData.sampleProducts[2].imageURL,
                itemCount: 18
            )
        }
    }
}

// MARK: - Shop View (Combined Apparel & Home)
struct ShopView: View {
    @State private var selectedCategory: ProductCategory? = nil
    @State private var searchText = ""
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Category selector
                CategorySelector(selectedCategory: $selectedCategory)
                
                // Search bar
                SearchBar(searchText: $searchText)
                
                // Products grid
                ScrollView {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 16), count: 2), spacing: 20) {
                        ForEach(filteredProducts) { product in
                            NavigationLink(destination: ProductDetailView(product: product)) {
                                ShopProductCard(product: product)
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

// MARK: - Supporting Components

struct HighlightCard: View {
    let title: String
    let subtitle: String
    let imageName: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(color.opacity(0.2))
                    .frame(width: 60, height: 60)
                
                Image(systemName: imageName)
                    .font(.title)
                    .foregroundColor(color)
            }
            
            VStack(spacing: 4) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                    .multilineTextAlignment(.center)
            }
        }
        .frame(width: 120)
        .padding()
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

struct CompactProductCard: View {
    let product: Product
    let showTrending: Bool
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ZStack(alignment: .topLeading) {
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                }
                .frame(width: 140, height: 170)
                .clipped()
                .cornerRadius(12)
                
                if showTrending {
                    Text("🔥")
                        .font(.title3)
                        .padding(8)
                }
            }
            
            VStack(alignment: .leading, spacing: 2) {
                Text(product.name)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .lineLimit(2)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(product.formattedPrice)
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaPrimary)
            }
        }
        .frame(width: 140)
    }
}

struct CategoryCard: View {
    let title: String
    let subtitle: String
    let icon: String
    let gradient: LinearGradient
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.largeTitle)
                .foregroundColor(.white)
            
            VStack(spacing: 4) {
                Text(title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.8))
            }
        }
        .frame(maxWidth: .infinity)
        .frame(height: 120)
        .background(gradient)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.2), radius: 8, x: 0, y: 4)
    }
}

struct CollectionCard: View {
    let title: String
    let description: String
    let imageUrl: String
    let itemCount: Int
    
    var body: some View {
        HStack(spacing: 16) {
            AsyncImage(url: URL(string: imageUrl)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.2))
            }
            .frame(width: 80, height: 80)
            .cornerRadius(12)
            
            VStack(alignment: .leading, spacing: 8) {
                Text(title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.indusaTextSecondary)
                    .lineLimit(2)
                
                Text("\(itemCount) items")
                    .font(.caption)
                    .foregroundColor(.indusaPrimary)
                    .fontWeight(.medium)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.indusaTextSecondary)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

struct CategorySelector: View {
    @Binding var selectedCategory: ProductCategory?
    
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 16) {
                CategoryChip(
                    title: "All",
                    isSelected: selectedCategory == nil,
                    action: { selectedCategory = nil }
                )
                
                CategoryChip(
                    title: "Fashion",
                    isSelected: selectedCategory == .clothing,
                    action: { selectedCategory = .clothing }
                )
                
                CategoryChip(
                    title: "Home",
                    isSelected: selectedCategory == .decor,
                    action: { selectedCategory = .decor }
                )
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 8)
    }
}

struct SearchBar: View {
    @Binding var searchText: String
    
    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.indusaTextSecondary)
            
            TextField("Search products...", text: $searchText)
                .textFieldStyle(PlainTextFieldStyle())
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .padding(.horizontal)
    }
}

struct ShopProductCard: View {
    let product: Product
    @EnvironmentObject var cartManager: CartManager
    @State private var isAddedToCart = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            AsyncImage(url: URL(string: product.imageURL)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.2))
            }
            .frame(height: 180)
            .clipped()
            .cornerRadius(12)
            
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
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaPrimary)
            }
            
            Button(action: addToCart) {
                HStack {
                    Image(systemName: isAddedToCart ? "checkmark" : "bag.badge.plus")
                    Text(isAddedToCart ? "Added!" : "Add to Cart")
                        .fontWeight(.medium)
                }
                .font(.caption)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 36)
                .background(isAddedToCart ? Color.green : Color.indusaPrimary)
                .cornerRadius(8)
            }
            .animation(.easeInOut(duration: 0.2), value: isAddedToCart)
        }
        .padding(12)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
    
    private func addToCart() {
        cartManager.addToCart(product)
        isAddedToCart = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isAddedToCart = false
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
        .environmentObject(AuthManager())
        .environmentObject(CartManager())
        .environmentObject(WardrobeManager())
}
