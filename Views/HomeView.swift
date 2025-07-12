import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var cartManager: CartManager
    @State private var searchText = ""
    @State private var showingSearch = false
    
    let featuredProducts = Array(MockData.sampleProducts.prefix(4))
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                ScrollView {
                    LazyVStack(spacing: 20) {
                        // Header with Search
                        headerSection
                        
                        // Hero Section
                        heroSection
                        
                        // Why Shop with Indusa
                        whyShopSection
                        
                        // Featured Products
                        featuredProductsSection
                        
                        // Categories
                        categoriesSection
                        
                        // Brand Mascot Section
                        mascotSection
                    }
                    .padding(.horizontal)
                }
                .refreshable {
                    // Refresh content
                }
            }
            .navigationBarHidden(true)
        }
        .sheet(isPresented: $showingSearch) {
            SearchView()
        }
    }
    
    private var headerSection: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text("INDUSA")
                        .font(.largeTitle)
                        .fontWeight(.black)
                        .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                    
                    Spacer()
                    
                    Button(action: { showingSearch = true }) {
                        Image(systemName: "magnifyingglass")
                            .font(.title2)
                            .foregroundColor(.indusaPrimary)
                    }
                    
                    NavigationLink(destination: CartView()) {
                        ZStack {
                            Image(systemName: "bag")
                                .font(.title2)
                                .foregroundColor(.indusaPrimary)
                            
                            if cartManager.totalItems > 0 {
                                Text("\(cartManager.totalItems)")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                    .frame(width: 16, height: 16)
                                    .background(Color.red)
                                    .clipShape(Circle())
                                    .offset(x: 8, y: -8)
                            }
                        }
                    }
                }
                
                Text("Made by Humans • Delivered By AI")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextSecondary)
                    .textCase(.uppercase)
                    .tracking(1)
            }
        }
        .padding(.top, 10)
    }
    
    private var heroSection: some View {
        VStack(spacing: 16) {
            Text("AI-Powered Virtual Try-On")
                .font(.title)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
                .foregroundColor(.indusaTextPrimary)
            
            Text("Experience the future of shopping with our cutting-edge AI technology")
                .font(.body)
                .multilineTextAlignment(.center)
                .foregroundColor(.indusaTextSecondary)
                .padding(.horizontal)
            
            Button(action: { appState.selectedTab = 3 }) {
                Text("Try On Now")
                    .fontWeight(.semibold)
            }
            .buttonStyle(IndusaButtonStyle(variant: .primary))
        }
        .padding(.vertical, 30)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(LinearGradient.indusaGradient.opacity(0.1))
        )
    }
    
    private var whyShopSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Why Shop With Indusa")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                FeatureCard(
                    icon: "sparkles",
                    title: "AI-Powered",
                    description: "Advanced virtual try-on technology"
                )
                
                FeatureCard(
                    icon: "heart.fill",
                    title: "Personalized",
                    description: "Curated recommendations just for you"
                )
                
                FeatureCard(
                    icon: "leaf.fill",
                    title: "Sustainable",
                    description: "Reducing returns with better fit"
                )
                
                FeatureCard(
                    icon: "star.fill",
                    title: "Premium",
                    description: "Top designers and quality brands"
                )
            }
        }
    }
    
    private var featuredProductsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Featured Products")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                NavigationLink("See All", destination: ApparelView())
                    .font(.subheadline)
                    .foregroundColor(.indusaPrimary)
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(featuredProducts) { product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            ProductCard(product: product)
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
            Text("Shop by Category")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            HStack(spacing: 16) {
                CategoryCard(
                    title: "Apparel",
                    icon: "tshirt.fill",
                    action: { appState.selectedTab = 1 }
                )
                
                CategoryCard(
                    title: "Home & Decor",
                    icon: "sofa.fill",
                    action: { appState.selectedTab = 2 }
                )
            }
        }
    }
    
    private var mascotSection: some View {
        VStack(spacing: 16) {
            Image(systemName: "face.smiling")
                .font(.system(size: 60))
                .foregroundStyle(LinearGradient.indusaGradientHorizontal)
            
            Text("Meet Our AI Assistant")
                .font(.title3)
                .fontWeight(.semibold)
                .foregroundColor(.indusaTextPrimary)
            
            Text("Your personal shopping companion, powered by advanced AI")
                .font(.body)
                .multilineTextAlignment(.center)
                .foregroundColor(.indusaTextSecondary)
        }
        .padding(.vertical, 30)
        .frame(maxWidth: .infinity)
        .indusaCardStyle()
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundStyle(LinearGradient.indusaGradientHorizontal)
            
            VStack(spacing: 4) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(description)
                    .font(.caption)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.indusaTextSecondary)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, minHeight: 120)
        .indusaCardStyle()
    }
}

struct CategoryCard: View {
    let title: String
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.title)
                    .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextPrimary)
            }
            .padding()
            .frame(maxWidth: .infinity, minHeight: 100)
            .indusaCardStyle()
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    HomeView()
        .environmentObject(AppState())
        .environmentObject(CartManager())
}
