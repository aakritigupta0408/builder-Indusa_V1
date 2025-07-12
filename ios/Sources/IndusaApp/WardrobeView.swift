import SwiftUI

struct WardrobeView: View {
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @EnvironmentObject var authManager: AuthManager
    @State private var selectedTab = 0
    @State private var searchText = ""
    @State private var selectedCategory: ProductCategory? = nil
    @State private var showingAddItem = false
    @State private var showingStyleStudio = false
    
    private let tabs = ["Past Orders", "My Collection", "Wishlist", "Outfits"]
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Header
                    headerSection
                    
                    // Tab Selection
                    tabSelector
                    
                    // Content
                    TabView(selection: $selectedTab) {
                        pastOrdersTab.tag(0)
                        personalCollectionTab.tag(1)
                        wishlistTab.tag(2)
                        outfitsTab.tag(3)
                    }
                    .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
                }
            }
            .navigationBarHidden(true)
        }
        .sheet(isPresented: $showingAddItem) {
            AddPersonalItemView()
        }
        .sheet(isPresented: $showingStyleStudio) {
            StyleStudioView()
        }
    }
    
    private var headerSection: some View {
        VStack(spacing: 16) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("My Wardrobe")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                    
                    Text("Manage your collection and create stunning outfits")
                        .font(.subheadline)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                Spacer()
                
                VStack(spacing: 8) {
                    Button(action: { showingAddItem = true }) {
                        Image(systemName: "plus")
                            .font(.title2)
                            .foregroundColor(.white)
                            .frame(width: 40, height: 40)
                            .background(Color.indusaPrimary)
                            .clipShape(Circle())
                    }
                    
                    Button(action: { showingStyleStudio = true }) {
                        Image(systemName: "sparkles")
                            .font(.title2)
                            .foregroundColor(.white)
                            .frame(width: 40, height: 40)
                            .background(LinearGradient.indusaGradientHorizontal)
                            .clipShape(Circle())
                    }
                }
            }
            
            // Search Bar
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.indusaTextSecondary)
                
                TextField("Search your wardrobe...", text: $searchText)
                    .textFieldStyle(PlainTextFieldStyle())
                
                if !searchText.isEmpty {
                    Button(action: { searchText = "" }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.indusaTextSecondary)
                    }
                }
            }
            .padding()
            .background(Color.indusaCardBackground)
            .cornerRadius(10)
        }
        .padding()
    }
    
    private var tabSelector: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 20) {
                ForEach(Array(tabs.enumerated()), id: \.offset) { index, tab in
                    Button(action: { selectedTab = index }) {
                        VStack(spacing: 8) {
                            Text(tab)
                                .font(.subheadline)
                                .fontWeight(selectedTab == index ? .semibold : .medium)
                                .foregroundColor(selectedTab == index ? .indusaPrimary : .indusaTextSecondary)
                            
                            Rectangle()
                                .fill(selectedTab == index ? Color.indusaPrimary : Color.clear)
                                .frame(height: 2)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding(.horizontal)
        }
        .padding(.bottom)
    }
    
    private var pastOrdersTab: some View {
        ScrollView {
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                ForEach(wardrobeManager.purchasedItems.filter { item in
                    searchText.isEmpty || item.product.name.localizedCaseInsensitiveContains(searchText)
                }, id: \.id) { item in
                    WardrobeItemCard(item: item)
                }
            }
            .padding()
        }
    }
    
    private var personalCollectionTab: some View {
        ScrollView {
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                ForEach(wardrobeManager.personalItems.filter { item in
                    searchText.isEmpty || item.product.name.localizedCaseInsensitiveContains(searchText)
                }, id: \.id) { item in
                    WardrobeItemCard(item: item)
                }
            }
            .padding()
        }
    }
    
    private var wishlistTab: some View {
        VStack(spacing: 20) {
            Image(systemName: "heart")
                .font(.system(size: 60))
                .foregroundColor(.indusaTextMuted)
            
            Text("Your Wishlist")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.indusaTextPrimary)
            
            Text("Items you've saved for later will appear here")
                .font(.body)
                .foregroundColor(.indusaTextSecondary)
                .multilineTextAlignment(.center)
            
            Button("Browse & Save Items") {
                // Navigate to catalog
            }
            .buttonStyle(IndusaButtonStyle(variant: .primary))
        }
        .padding()
    }
    
    private var outfitsTab: some View {
        ScrollView {
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 1), spacing: 16) {
                ForEach(wardrobeManager.savedOutfits, id: \.id) { outfit in
                    OutfitCard(outfit: outfit)
                }
            }
            .padding()
        }
    }
}

struct WardrobeItemCard: View {
    let item: WardrobeItem
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @State private var showingTryOn = false
    @State private var showingShare = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: item.product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                }
                .frame(height: 150)
                .clipped()
                .cornerRadius(10)
                
                // Item Type Badge
                Text(item.itemType)
                    .font(.caption2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(item.isPersonalItem ? Color.indusaSecondary : Color.indusaPrimary)
                    .cornerRadius(4)
                    .padding(8)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.product.name)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .lineLimit(2)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(item.product.brand)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                Text(item.product.color)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                HStack(spacing: 8) {
                    Button(action: { wardrobeManager.addToStyleStudio(item) }) {
                        Image(systemName: "plus")
                            .font(.caption)
                            .foregroundColor(.indusaPrimary)
                    }
                    
                    Button(action: { showingTryOn = true }) {
                        Image(systemName: "eye")
                            .font(.caption)
                            .foregroundColor(.indusaPrimary)
                    }
                    
                    Button(action: { showingShare = true }) {
                        Image(systemName: "square.and.arrow.up")
                            .font(.caption)
                            .foregroundColor(.indusaPrimary)
                    }
                    
                    Spacer()
                }
                .padding(.top, 4)
            }
        }
        .indusaCardStyle()
        .sheet(isPresented: $showingTryOn) {
            TryOnView(selectedProduct: item.product)
        }
        .sheet(isPresented: $showingShare) {
            // Instagram Share View
            InstagramShareView(product: item.product)
        }
    }
}

struct OutfitCard: View {
    let outfit: StyleOutfit
    @EnvironmentObject var wardrobeManager: WardrobeManager
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(outfit.name)
                    .font(.headline)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                if let occasion = outfit.occasion {
                    Text(occasion)
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.indusaSecondary.opacity(0.1))
                        .cornerRadius(4)
                }
            }
            
            // Show outfit items in a grid
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: min(outfit.items.count, 4)), spacing: 8) {
                ForEach(Array(outfit.items.prefix(4).enumerated()), id: \.offset) { index, item in
                    AsyncImage(url: URL(string: item.product.imageURL)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Rectangle()
                            .fill(Color.gray.opacity(0.2))
                    }
                    .frame(height: 80)
                    .clipped()
                    .cornerRadius(8)
                }
            }
            
            HStack {
                Text("\(outfit.items.count) items")
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                Spacer()
                
                Text(outfit.createdAt, style: .date)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
            }
            
            HStack(spacing: 12) {
                Button("Preview") {
                    // Show outfit preview
                }
                .buttonStyle(IndusaButtonStyle(variant: .outline))
                
                Button("Share") {
                    // Share outfit
                }
                .buttonStyle(IndusaButtonStyle(variant: .outline))
                
                Spacer()
                
                Button(action: { wardrobeManager.deleteOutfit(outfit) }) {
                    Image(systemName: "trash")
                        .foregroundColor(.red)
                }
            }
        }
        .padding()
        .indusaCardStyle()
    }
}

struct AddPersonalItemView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @State private var name = ""
    @State private var brand = ""
    @State private var color = ""
    @State private var category: ProductCategory = .clothing
    @State private var selectedImage: UIImage?
    @State private var showingImagePicker = false
    
    var body: some View {
        NavigationView {
            Form {
                Section("Item Details") {
                    TextField("Item name", text: $name)
                    TextField("Brand", text: $brand)
                    TextField("Color", text: $color)
                    
                    Picker("Category", selection: $category) {
                        Text("Clothing").tag(ProductCategory.clothing)
                        Text("Home Decor").tag(ProductCategory.decor)
                    }
                }
                
                Section("Photo") {
                    if let selectedImage = selectedImage {
                        Image(uiImage: selectedImage)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(maxHeight: 200)
                            .cornerRadius(8)
                    }
                    
                    Button("Upload Photo") {
                        showingImagePicker = true
                    }
                }
            }
            .navigationTitle("Add Personal Item")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Add") {
                        addItem()
                    }
                    .disabled(name.isEmpty || brand.isEmpty)
                }
            }
        }
        .sheet(isPresented: $showingImagePicker) {
            ImagePicker(selectedImage: $selectedImage)
        }
    }
    
    private func addItem() {
        let product = Product(
            id: Int.random(in: 1000...9999),
            name: name,
            price: 0.0,
            originalPrice: nil,
            brand: brand,
            color: color,
            availableColors: [color],
            category: category,
            subcategory: nil,
            imageURL: "https://via.placeholder.com/300",
            images: nil,
            rating: 0.0,
            reviews: 0,
            sizes: nil,
            material: nil,
            isNew: false,
            onSale: false
        )
        
        wardrobeManager.addPersonalItem(product)
        dismiss()
    }
}

struct StyleStudioView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @State private var outfitName = ""
    @State private var occasion = ""
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Style Studio")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                
                Text("Combine items to create the perfect outfit")
                    .font(.subheadline)
                    .foregroundColor(.indusaTextSecondary)
                
                // Selected Items
                if !wardrobeManager.selectedItems.isEmpty {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Current Outfit (\(wardrobeManager.selectedItems.count) items)")
                            .font(.headline)
                        
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 3), spacing: 12) {
                            ForEach(wardrobeManager.selectedItems, id: \.id) { item in
                                VStack {
                                    AsyncImage(url: URL(string: item.product.imageURL)) { image in
                                        image
                                            .resizable()
                                            .aspectRatio(contentMode: .fill)
                                    } placeholder: {
                                        Rectangle()
                                            .fill(Color.gray.opacity(0.2))
                                    }
                                    .frame(height: 80)
                                    .clipped()
                                    .cornerRadius(8)
                                    
                                    Button(action: { wardrobeManager.removeFromStyleStudio(item) }) {
                                        Image(systemName: "minus.circle.fill")
                                            .foregroundColor(.red)
                                    }
                                }
                            }
                        }
                    }
                    .padding()
                    .indusaCardStyle()
                    
                    // Save Outfit Form
                    VStack(spacing: 12) {
                        TextField("Outfit name", text: $outfitName)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        TextField("Occasion (optional)", text: $occasion)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        Button("Save Outfit") {
                            saveOutfit()
                        }
                        .buttonStyle(IndusaButtonStyle(variant: .primary))
                        .disabled(outfitName.isEmpty)
                    }
                    .padding()
                    .indusaCardStyle()
                }
                
                Spacer()
            }
            .padding()
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Close") {
                        dismiss()
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Clear All") {
                        wardrobeManager.clearStyleStudio()
                    }
                    .disabled(wardrobeManager.selectedItems.isEmpty)
                }
            }
        }
    }
    
    private func saveOutfit() {
        wardrobeManager.saveOutfit(name: outfitName, occasion: occasion.isEmpty ? nil : occasion)
        outfitName = ""
        occasion = ""
    }
}

struct InstagramShareView: View {
    let product: Product
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Share on Instagram")
                    .font(.title2)
                    .fontWeight(.bold)
                
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                }
                .frame(maxHeight: 300)
                .cornerRadius(12)
                
                Text("Just tried on this amazing \(product.name) from \(product.brand) using Indusa's AI try-on! 🔥✨ #IndusaAI #VirtualTryOn #AIFashion")
                    .font(.body)
                    .foregroundColor(.indusaTextSecondary)
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(8)
                
                Button("Open Instagram") {
                    // Open Instagram
                    if let url = URL(string: "instagram://") {
                        UIApplication.shared.open(url)
                    }
                    dismiss()
                }
                .buttonStyle(IndusaButtonStyle(variant: .primary))
                
                Spacer()
            }
            .padding()
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

#Preview {
    WardrobeView()
        .environmentObject(WardrobeManager())
        .environmentObject(AuthManager())
}
