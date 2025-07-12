import SwiftUI

struct UserHubView: View {
    @EnvironmentObject var authManager: AuthManager
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @EnvironmentObject var cartManager: CartManager
    @State private var showingLogin = false
    @State private var showingTryOn = false
    @State private var showingAISizing = false
    @State private var showingWardrobe = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        if authManager.isAuthenticated {
                            authenticatedUserView
                        } else {
                            guestUserView
                        }
                        
                        // AI Features Section - Always visible
                        aiFeatureSection
                        
                        if authManager.isAuthenticated {
                            // Account & Settings
                            accountSection
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("You")
            .navigationBarTitleDisplayMode(.large)
        }
        .sheet(isPresented: $showingLogin) {
            LoginView()
        }
        .sheet(isPresented: $showingTryOn) {
            TryOnView()
        }
        .sheet(isPresented: $showingAISizing) {
            AISizingView()
        }
        .sheet(isPresented: $showingWardrobe) {
            WardrobeView()
        }
    }
    
    // MARK: - Authenticated User View
    private var authenticatedUserView: some View {
        VStack(spacing: 20) {
            // User Profile Header
            userProfileHeader
            
            // Quick Stats
            userQuickStats
            
            // My Wardrobe Section
            wardrobeSection
        }
    }
    
    private var userProfileHeader: some View {
        HStack(spacing: 16) {
            // Avatar
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
                                .font(.title)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        )
                }
                .frame(width: 80, height: 80)
                .clipShape(Circle())
                
                VStack(alignment: .leading, spacing: 4) {
                    Text("Welcome back!")
                        .font(.subheadline)
                        .foregroundColor(.indusaTextSecondary)
                    
                    Text(user.name)
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text(user.email)
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
            }
            
            Spacer()
            
            // Settings button
            Button(action: {}) {
                Image(systemName: "gearshape.fill")
                    .font(.title2)
                    .foregroundColor(.indusaTextSecondary)
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
    
    private var userQuickStats: some View {
        HStack(spacing: 16) {
            UserStatCard(
                title: "Wardrobe",
                value: "\(wardrobeManager.wardrobeItems.count)",
                icon: "tshirt.fill",
                color: .indusaPrimary
            )
            
            UserStatCard(
                title: "Outfits",
                value: "\(wardrobeManager.savedOutfits.count)",
                icon: "person.crop.square",
                color: .purple
            )
            
            UserStatCard(
                title: "Wishlist",
                value: "\(cartManager.wishlist.count)",
                icon: "heart.fill",
                color: .red
            )
        }
    }
    
    private var wardrobeSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("👗 My Wardrobe")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                Button("View All") {
                    showingWardrobe = true
                }
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.indusaPrimary)
            }
            
            if wardrobeManager.wardrobeItems.isEmpty {
                EmptyWardrobeCard()
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(Array(wardrobeManager.wardrobeItems.prefix(4)), id: \.id) { item in
                            WardrobeItemPreview(item: item)
                        }
                        
                        // Add more button
                        Button(action: { showingWardrobe = true }) {
                            VStack(spacing: 8) {
                                Image(systemName: "plus")
                                    .font(.title2)
                                    .foregroundColor(.indusaPrimary)
                                
                                Text("Add More")
                                    .font(.caption)
                                    .fontWeight(.medium)
                                    .foregroundColor(.indusaPrimary)
                            }
                            .frame(width: 80, height: 100)
                            .background(Color.indusaPrimary.opacity(0.1))
                            .cornerRadius(12)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.indusaPrimary, lineWidth: 1, lineCap: .round)
                                    .strokeBorder(style: StrokeStyle(lineWidth: 1, dash: [5]))
                            )
                        }
                    }
                    .padding(.horizontal)
                }
            }
        }
    }
    
    // MARK: - Guest User View
    private var guestUserView: some View {
        VStack(spacing: 24) {
            // Welcome card
            VStack(spacing: 16) {
                Image(systemName: "person.circle")
                    .font(.system(size: 60))
                    .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                
                VStack(spacing: 8) {
                    Text("Welcome to INDUSA")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text("Sign in to unlock your personal wardrobe, AI styling, and much more!")
                        .font(.body)
                        .multilineTextAlignment(.center)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                Button(action: { showingLogin = true }) {
                    HStack(spacing: 8) {
                        Image(systemName: "person.badge.plus")
                        Text("Sign In / Create Account")
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                    .background(LinearGradient.indusaGradientHorizontal)
                    .cornerRadius(12)
                }
            }
            .padding(24)
            .background(Color.white)
            .cornerRadius(20)
            .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
            
            // Guest features preview
            guestFeaturesPreview
        }
    }
    
    private var guestFeaturesPreview: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("✨ What you'll get with an account")
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            VStack(spacing: 12) {
                GuestFeatureRow(
                    icon: "tshirt.fill",
                    title: "Personal Wardrobe",
                    description: "Save and organize your favorite items"
                )
                
                GuestFeatureRow(
                    icon: "brain",
                    title: "AI Styling Recommendations",
                    description: "Get personalized outfit suggestions"
                )
                
                GuestFeatureRow(
                    icon: "heart.fill",
                    title: "Wishlist & Favorites",
                    description: "Never lose track of items you love"
                )
                
                GuestFeatureRow(
                    icon: "clock.arrow.circlepath",
                    title: "Order History",
                    description: "Track purchases and reorder easily"
                )
            }
        }
    }
    
    // MARK: - AI Features Section
    private var aiFeatureSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("🤖 AI-Powered Features")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            VStack(spacing: 12) {
                // Virtual Try-On
                AIFeatureCard(
                    icon: "camera.viewfinder",
                    title: "Virtual Try-On",
                    subtitle: "See how clothes look on you",
                    description: "Use AI to try on clothing virtually",
                    gradient: LinearGradient(colors: [.purple, .pink], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: { showingTryOn = true }
                )
                
                // AI Sizing
                AIFeatureCard(
                    icon: "ruler",
                    title: "AI Sizing",
                    subtitle: "Perfect fit every time",
                    description: "Get accurate size recommendations",
                    gradient: LinearGradient(colors: [.blue, .cyan], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: { showingAISizing = true }
                )
                
                // Style Recommendations (Premium feature)
                AIFeatureCard(
                    icon: "brain.head.profile",
                    title: "AI Style Assistant",
                    subtitle: authManager.isAuthenticated ? "Get personalized looks" : "Sign in to unlock",
                    description: authManager.isAuthenticated ? "Smart outfit combinations" : "Create an account to access AI styling",
                    gradient: LinearGradient(colors: [.green, .mint], startPoint: .topLeading, endPoint: .bottomTrailing),
                    action: {
                        if authManager.isAuthenticated {
                            // Show AI styling
                        } else {
                            showingLogin = true
                        }
                    }
                )
            }
        }
    }
    
    // MARK: - Account Section
    private var accountSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("⚙️ Account & Settings")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            VStack(spacing: 12) {
                AccountMenuItem(
                    icon: "bag",
                    title: "Order History",
                    subtitle: "View past purchases"
                )
                
                AccountMenuItem(
                    icon: "creditcard",
                    title: "Payment Methods",
                    subtitle: "Manage cards and billing"
                )
                
                AccountMenuItem(
                    icon: "location",
                    title: "Addresses",
                    subtitle: "Shipping and billing addresses"
                )
                
                AccountMenuItem(
                    icon: "bell",
                    title: "Notifications",
                    subtitle: "Manage your preferences"
                )
                
                AccountMenuItem(
                    icon: "questionmark.circle",
                    title: "Help & Support",
                    subtitle: "Get assistance"
                )
                
                // Sign out button
                Button(action: { authManager.signOut() }) {
                    HStack {
                        Image(systemName: "rectangle.portrait.and.arrow.right")
                            .foregroundColor(.red)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Sign Out")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(.red)
                            
                            Text("Sign out of your account")
                                .font(.caption)
                                .foregroundColor(.red.opacity(0.7))
                        }
                        
                        Spacer()
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.red.opacity(0.3), lineWidth: 1)
                    )
                }
            }
        }
    }
}

// MARK: - Supporting Components

struct UserStatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
            
            Text(value)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.indusaTextSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.white)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 3, x: 0, y: 2)
    }
}

struct WardrobeItemPreview: View {
    let item: WardrobeItem
    
    var body: some View {
        VStack(spacing: 6) {
            AsyncImage(url: URL(string: item.product.imageURL)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.2))
            }
            .frame(width: 80, height: 100)
            .clipped()
            .cornerRadius(8)
            
            Text(item.product.name)
                .font(.caption2)
                .fontWeight(.medium)
                .lineLimit(2)
                .multilineTextAlignment(.center)
                .foregroundColor(.indusaTextPrimary)
        }
        .frame(width: 80)
    }
}

struct EmptyWardrobeCard: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "tshirt")
                .font(.largeTitle)
                .foregroundColor(.indusaTextMuted)
            
            Text("No items in wardrobe yet")
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.indusaTextPrimary)
            
            Text("Start adding items to build your personal collection")
                .font(.caption)
                .multilineTextAlignment(.center)
                .foregroundColor(.indusaTextSecondary)
            
            Button("Add First Item") {
                // Action to add item
            }
            .font(.caption)
            .fontWeight(.semibold)
            .foregroundColor(.indusaPrimary)
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1, lineCap: .round)
                .strokeBorder(style: StrokeStyle(lineWidth: 1, dash: [5]))
        )
    }
}

struct GuestFeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(.indusaPrimary)
                .frame(width: 24)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(description)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
            }
            
            Spacer()
        }
    }
}

struct AIFeatureCard: View {
    let icon: String
    let title: String
    let subtitle: String
    let description: String
    let gradient: LinearGradient
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                ZStack {
                    Circle()
                        .fill(gradient)
                        .frame(width: 50, height: 50)
                    
                    Image(systemName: icon)
                        .font(.title2)
                        .foregroundColor(.white)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.bold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text(subtitle)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.indusaTextSecondary)
                    
                    Text(description)
                        .font(.caption)
                        .foregroundColor(.indusaTextMuted)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
            }
            .padding()
            .background(Color.white)
            .cornerRadius(16)
            .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

struct AccountMenuItem: View {
    let icon: String
    let title: String
    let subtitle: String
    
    var body: some View {
        Button(action: {}) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(.indusaPrimary)
                    .frame(width: 24)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.indusaTextPrimary)
                    
                    Text(subtitle)
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
            }
            .padding()
            .background(Color.white)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.05), radius: 3, x: 0, y: 2)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - AI Sizing View
struct AISizingView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var selectedCategory: ProductCategory = .clothing
    @State private var measurements: [String: String] = [:]
    @State private var showingResults = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 12) {
                        Image(systemName: "ruler")
                            .font(.system(size: 50))
                            .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                        
                        Text("AI Size Recommendation")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.indusaTextPrimary)
                        
                        Text("Get perfect fit recommendations using AI")
                            .font(.body)
                            .multilineTextAlignment(.center)
                            .foregroundColor(.indusaTextSecondary)
                    }
                    .padding()
                    
                    // Category selection
                    Picker("Category", selection: $selectedCategory) {
                        Text("Clothing").tag(ProductCategory.clothing)
                        Text("Home Decor").tag(ProductCategory.decor)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal)
                    
                    if selectedCategory == .clothing {
                        clothingMeasurements
                    } else {
                        homeDecorMeasurements
                    }
                    
                    // Get recommendation button
                    Button(action: { showingResults = true }) {
                        HStack(spacing: 8) {
                            Image(systemName: "brain")
                            Text("Get AI Size Recommendation")
                                .fontWeight(.semibold)
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(LinearGradient.indusaGradientHorizontal)
                        .cornerRadius(12)
                    }
                    .padding(.horizontal)
                }
            }
            .navigationTitle("AI Sizing")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .sheet(isPresented: $showingResults) {
            SizeRecommendationResults()
        }
    }
    
    private var clothingMeasurements: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Enter Your Measurements")
                .font(.headline)
                .foregroundColor(.indusaTextPrimary)
                .padding(.horizontal)
            
            VStack(spacing: 12) {
                MeasurementField(title: "Height (cm)", value: $measurements["height"])
                MeasurementField(title: "Weight (kg)", value: $measurements["weight"])
                MeasurementField(title: "Chest/Bust (cm)", value: $measurements["chest"])
                MeasurementField(title: "Waist (cm)", value: $measurements["waist"])
                MeasurementField(title: "Hip (cm)", value: $measurements["hip"])
            }
            .padding(.horizontal)
        }
    }
    
    private var homeDecorMeasurements: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Room Measurements")
                .font(.headline)
                .foregroundColor(.indusaTextPrimary)
                .padding(.horizontal)
            
            VStack(spacing: 12) {
                MeasurementField(title: "Room Length (m)", value: $measurements["length"])
                MeasurementField(title: "Room Width (m)", value: $measurements["width"])
                MeasurementField(title: "Ceiling Height (m)", value: $measurements["ceiling"])
            }
            .padding(.horizontal)
        }
    }
}

struct MeasurementField: View {
    let title: String
    @Binding var value: String?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.indusaTextPrimary)
            
            TextField("Enter \(title.lowercased())", text: Binding(
                get: { value ?? "" },
                set: { value = $0.isEmpty ? nil : $0 }
            ))
            .keyboardType(.decimalPad)
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(8)
        }
    }
}

struct SizeRecommendationResults: View {
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                // Success animation area
                VStack(spacing: 16) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.green)
                    
                    Text("Perfect Match Found!")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.indusaTextPrimary)
                }
                .padding()
                
                // Size recommendations
                VStack(alignment: .leading, spacing: 16) {
                    Text("Recommended Sizes")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    VStack(spacing: 12) {
                        SizeRecommendationRow(brand: "ZARA", size: "M", confidence: "95%")
                        SizeRecommendationRow(brand: "H&M", size: "L", confidence: "92%")
                        SizeRecommendationRow(brand: "UNIQLO", size: "M", confidence: "98%")
                    }
                }
                .padding()
                .background(Color.white)
                .cornerRadius(16)
                .shadow(color: .black.opacity(0.1), radius: 4)
                
                Spacer()
                
                Button("Start Shopping with These Sizes") {
                    dismiss()
                }
                .buttonStyle(IndusaButtonStyle(variant: .primary))
                .frame(maxWidth: .infinity)
            }
            .padding()
            .navigationTitle("Size Results")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct SizeRecommendationRow: View {
    let brand: String
    let size: String
    let confidence: String
    
    var body: some View {
        HStack {
            Text(brand)
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(.indusaTextPrimary)
            
            Spacer()
            
            Text("Size \(size)")
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(.indusaPrimary)
            
            Text("(\(confidence) match)")
                .font(.caption)
                .foregroundColor(.indusaTextSecondary)
        }
        .padding()
        .background(Color.gray.opacity(0.05))
        .cornerRadius(8)
    }
}

#Preview {
    UserHubView()
        .environmentObject(AuthManager())
        .environmentObject(WardrobeManager())
        .environmentObject(CartManager())
}
