import SwiftUI

// MARK: - Apparel View
struct ApparelView: View {
    @State private var searchText = ""
    @State private var selectedFilters = SearchFilters(
        category: .clothing,
        priceRange: nil,
        brands: [],
        colors: [],
        sizes: [],
        sortBy: .popular
    )
    
    let products = MockData.sampleProducts.filter { $0.category == .clothing }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Search Bar
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.indusaTextSecondary)
                        
                        TextField("Search apparel...", text: $searchText)
                            .textFieldStyle(PlainTextFieldStyle())
                    }
                    .padding()
                    .background(Color.indusaCardBackground)
                    .cornerRadius(10)
                    .padding()
                    
                    // Products Grid
                    ScrollView {
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                            ForEach(filteredProducts) { product in
                                NavigationLink(destination: ProductDetailView(product: product)) {
                                    ProductCard(product: product)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Apparel")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var filteredProducts: [Product] {
        products.filter { product in
            searchText.isEmpty || product.name.localizedCaseInsensitiveContains(searchText) ||
            product.brand.localizedCaseInsensitiveContains(searchText)
        }
    }
}

// MARK: - Home Decor View
struct HomeDecorView: View {
    @State private var searchText = ""
    
    let products = MockData.sampleProducts.filter { $0.category == .decor }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Search Bar
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.indusaTextSecondary)
                        
                        TextField("Search home decor...", text: $searchText)
                            .textFieldStyle(PlainTextFieldStyle())
                    }
                    .padding()
                    .background(Color.indusaCardBackground)
                    .cornerRadius(10)
                    .padding()
                    
                    // Products Grid
                    ScrollView {
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                            ForEach(filteredProducts) { product in
                                NavigationLink(destination: ProductDetailView(product: product)) {
                                    ProductCard(product: product)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("Home & Decor")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var filteredProducts: [Product] {
        products.filter { product in
            searchText.isEmpty || product.name.localizedCaseInsensitiveContains(searchText) ||
            product.brand.localizedCaseInsensitiveContains(searchText)
        }
    }
}

// MARK: - Product Detail View
struct ProductDetailView: View {
    let product: Product
    @EnvironmentObject var cartManager: CartManager
    @EnvironmentObject var wardrobeManager: WardrobeManager
    @State private var selectedSize: String?
    @State private var selectedColor: String
    @State private var quantity = 1
    @State private var showingTryOn = false
    @State private var isAddedToCart = false
    
    init(product: Product) {
        self.product = product
        self._selectedColor = State(initialValue: product.color)
    }
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Product Image
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .overlay(
                            ProgressView()
                        )
                }
                .frame(maxHeight: 400)
                .cornerRadius(12)
                
                VStack(alignment: .leading, spacing: 16) {
                    // Product Info
                    VStack(alignment: .leading, spacing: 8) {
                        Text(product.brand)
                            .font(.subheadline)
                            .foregroundColor(.indusaTextSecondary)
                        
                        Text(product.name)
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.indusaTextPrimary)
                        
                        HStack(alignment: .bottom, spacing: 8) {
                            Text(product.formattedPrice)
                                .font(.title3)
                                .fontWeight(.semibold)
                                .foregroundColor(.indusaPrimary)
                            
                            if let originalPrice = product.formattedOriginalPrice {
                                Text(originalPrice)
                                    .font(.subheadline)
                                    .strikethrough()
                                    .foregroundColor(.indusaTextSecondary)
                            }
                        }
                        
                        if let reviews = product.reviews {
                            HStack(spacing: 4) {
                                ForEach(0..<5) { index in
                                    Image(systemName: index < Int(product.rating) ? "star.fill" : "star")
                                        .foregroundColor(.yellow)
                                        .font(.caption)
                                }
                                Text("\(product.rating, specifier: "%.1f") (\(reviews) reviews)")
                                    .font(.caption)
                                    .foregroundColor(.indusaTextSecondary)
                            }
                        }
                    }
                    
                    // Color Selection
                    if let availableColors = product.availableColors, availableColors.count > 1 {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Color: \(selectedColor)")
                                .font(.subheadline)
                                .fontWeight(.medium)
                            
                            HStack(spacing: 12) {
                                ForEach(availableColors, id: \.self) { color in
                                    Button(action: { selectedColor = color }) {
                                        Circle()
                                            .fill(colorFromString(color))
                                            .frame(width: 32, height: 32)
                                            .overlay(
                                                Circle()
                                                    .stroke(selectedColor == color ? Color.indusaPrimary : Color.clear, lineWidth: 2)
                                            )
                                    }
                                }
                            }
                        }
                    }
                    
                    // Size Selection
                    if let sizes = product.sizes {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Size")
                                .font(.subheadline)
                                .fontWeight(.medium)
                            
                            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 8) {
                                ForEach(sizes, id: \.self) { size in
                                    Button(action: { selectedSize = size }) {
                                        Text(size)
                                            .font(.subheadline)
                                            .fontWeight(.medium)
                                            .foregroundColor(selectedSize == size ? .white : .indusaTextPrimary)
                                            .frame(minWidth: 44, minHeight: 44)
                                            .background(selectedSize == size ? Color.indusaPrimary : Color.clear)
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 8)
                                                    .stroke(Color.indusaPrimary, lineWidth: 1)
                                            )
                                            .cornerRadius(8)
                                    }
                                }
                            }
                        }
                    }
                    
                    // Quantity
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Quantity")
                            .font(.subheadline)
                            .fontWeight(.medium)
                        
                        HStack {
                            Button(action: { if quantity > 1 { quantity -= 1 } }) {
                                Image(systemName: "minus")
                                    .frame(width: 32, height: 32)
                                    .background(Color.gray.opacity(0.2))
                                    .cornerRadius(8)
                            }
                            .disabled(quantity <= 1)
                            
                            Text("\(quantity)")
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .frame(minWidth: 40)
                            
                            Button(action: { quantity += 1 }) {
                                Image(systemName: "plus")
                                    .frame(width: 32, height: 32)
                                    .background(Color.gray.opacity(0.2))
                                    .cornerRadius(8)
                            }
                            
                            Spacer()
                        }
                    }
                    
                    // Material Info
                    if let material = product.material {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Material")
                                .font(.subheadline)
                                .fontWeight(.medium)
                            
                            Text(material)
                                .font(.body)
                                .foregroundColor(.indusaTextSecondary)
                        }
                    }
                    
                    // Action Buttons
                    VStack(spacing: 12) {
                        Button(action: { showingTryOn = true }) {
                            HStack(spacing: 8) {
                                Image(systemName: "sparkles")
                                Text("Virtual Try-On")
                                    .fontWeight(.semibold)
                            }
                        }
                        .buttonStyle(IndusaButtonStyle(variant: .secondary))
                        .frame(maxWidth: .infinity)
                        
                        Button(action: addToCart) {
                            HStack(spacing: 8) {
                                Image(systemName: isAddedToCart ? "checkmark" : "bag.badge.plus")
                                Text(isAddedToCart ? "Added to Cart" : "Add to Cart")
                                    .fontWeight(.semibold)
                            }
                        }
                        .buttonStyle(IndusaButtonStyle(variant: .primary))
                        .frame(maxWidth: .infinity)
                        .animation(.easeInOut(duration: 0.2), value: isAddedToCart)
                        
                        Button(action: toggleWishlist) {
                            HStack(spacing: 8) {
                                Image(systemName: cartManager.isInWishlist(product) ? "heart.fill" : "heart")
                                Text(cartManager.isInWishlist(product) ? "Remove from Wishlist" : "Add to Wishlist")
                                    .fontWeight(.medium)
                            }
                        }
                        .buttonStyle(IndusaButtonStyle(variant: .outline))
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding()
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showingTryOn) {
            TryOnView(selectedProduct: product)
        }
    }
    
    private func addToCart() {
        cartManager.addToCart(product, quantity: quantity, selectedSize: selectedSize, selectedColor: selectedColor)
        wardrobeManager.addPurchasedItem(product)
        isAddedToCart = true
        
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
    }
    
    private func colorFromString(_ colorName: String) -> Color {
        switch colorName.lowercased() {
        case "white": return .white
        case "black": return .black
        case "red": return .red
        case "blue", "dark blue", "light blue": return .blue
        case "green", "sage green": return .green
        case "yellow": return .yellow
        case "pink", "dusty pink": return .pink
        case "purple": return .purple
        case "gray", "grey": return .gray
        case "brown": return .brown
        case "orange": return .orange
        default: return .gray
        }
    }
}

// MARK: - Cart View
struct CartView: View {
    @EnvironmentObject var cartManager: CartManager
    @State private var showingCheckout = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                if cartManager.cartItems.isEmpty {
                    VStack(spacing: 20) {
                        Image(systemName: "bag")
                            .font(.system(size: 60))
                            .foregroundColor(.indusaTextMuted)
                        
                        Text("Your cart is empty")
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.indusaTextPrimary)
                        
                        Text("Add some items to get started")
                            .font(.body)
                            .foregroundColor(.indusaTextSecondary)
                        
                        Button("Start Shopping") {
                            // Navigate back
                        }
                        .buttonStyle(IndusaButtonStyle(variant: .primary))
                    }
                } else {
                    VStack(spacing: 0) {
                        // Cart Items
                        ScrollView {
                            LazyVStack(spacing: 16) {
                                ForEach(cartManager.cartItems, id: \.id) { item in
                                    CartItemRow(item: item)
                                }
                            }
                            .padding()
                        }
                        
                        // Cart Summary
                        VStack(spacing: 16) {
                            HStack {
                                Text("Total (\(cartManager.totalItems) items)")
                                    .font(.headline)
                                    .foregroundColor(.indusaTextPrimary)
                                
                                Spacer()
                                
                                Text(cartManager.formattedTotalPrice)
                                    .font(.title3)
                                    .fontWeight(.bold)
                                    .foregroundColor(.indusaPrimary)
                            }
                            
                            Button("Proceed to Checkout") {
                                showingCheckout = true
                            }
                            .buttonStyle(IndusaButtonStyle(variant: .primary))
                            .frame(maxWidth: .infinity)
                        }
                        .padding()
                        .background(Color.indusaCardBackground)
                        .shadow(radius: 4)
                    }
                }
            }
            .navigationTitle("Shopping Cart")
            .navigationBarTitleDisplayMode(.large)
        }
        .sheet(isPresented: $showingCheckout) {
            CheckoutView()
        }
    }
}

struct CartItemRow: View {
    let item: CartItem
    @EnvironmentObject var cartManager: CartManager
    
    var body: some View {
        HStack(spacing: 12) {
            AsyncImage(url: URL(string: item.product.imageURL)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color.gray.opacity(0.2))
            }
            .frame(width: 80, height: 80)
            .cornerRadius(8)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.product.name)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(item.product.brand)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                if let size = item.selectedSize {
                    Text("Size: \(size)")
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                if let color = item.selectedColor {
                    Text("Color: \(color)")
                        .font(.caption)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                Text("$\(String(format: "%.2f", item.totalPrice))")
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.indusaPrimary)
            }
            
            Spacer()
            
            VStack(spacing: 8) {
                HStack {
                    Button(action: { cartManager.updateQuantity(for: item, quantity: item.quantity - 1) }) {
                        Image(systemName: "minus")
                            .font(.caption)
                            .frame(width: 24, height: 24)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(4)
                    }
                    .disabled(item.quantity <= 1)
                    
                    Text("\(item.quantity)")
                        .font(.caption)
                        .fontWeight(.medium)
                        .frame(minWidth: 20)
                    
                    Button(action: { cartManager.updateQuantity(for: item, quantity: item.quantity + 1) }) {
                        Image(systemName: "plus")
                            .font(.caption)
                            .frame(width: 24, height: 24)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(4)
                    }
                }
                
                Button(action: { cartManager.removeFromCart(item) }) {
                    Image(systemName: "trash")
                        .font(.caption)
                        .foregroundColor(.red)
                }
            }
        }
        .padding()
        .indusaCardStyle()
    }
}

// MARK: - Search View
struct SearchView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var searchText = ""
    @State private var searchResults: [Product] = []
    
    var body: some View {
        NavigationView {
            VStack {
                // Search Bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.indusaTextSecondary)
                    
                    TextField("Search for products...", text: $searchText)
                        .textFieldStyle(PlainTextFieldStyle())
                        .onSubmit {
                            performSearch()
                        }
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
                .padding()
                
                // Search Results
                if searchResults.isEmpty && !searchText.isEmpty {
                    VStack(spacing: 16) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 40))
                            .foregroundColor(.indusaTextMuted)
                        
                        Text("No results found")
                            .font(.headline)
                            .foregroundColor(.indusaTextPrimary)
                        
                        Text("Try adjusting your search terms")
                            .font(.body)
                            .foregroundColor(.indusaTextSecondary)
                    }
                    .padding()
                } else {
                    ScrollView {
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                            ForEach(searchResults) { product in
                                NavigationLink(destination: ProductDetailView(product: product)) {
                                    ProductCard(product: product)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding()
                    }
                }
                
                Spacer()
            }
            .navigationTitle("Search")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .onAppear {
            if searchText.isEmpty {
                searchResults = Array(MockData.sampleProducts.prefix(4))
            }
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

// MARK: - Product Picker View
struct ProductPickerView: View {
    @Binding var selectedProduct: Product?
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var appState: AppState
    
    var filteredProducts: [Product] {
        MockData.sampleProducts.filter { $0.category == (appState.tryOnMode == .clothing ? .clothing : .decor) }
    }
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 2), spacing: 16) {
                    ForEach(filteredProducts) { product in
                        Button(action: {
                            selectedProduct = product
                            dismiss()
                        }) {
                            ProductCard(product: product)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding()
            }
            .navigationTitle("Select Product")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
}

// MARK: - Checkout View
struct CheckoutView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var cartManager: CartManager
    @State private var showingSuccess = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Order Summary
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Order Summary")
                            .font(.headline)
                            .foregroundColor(.indusaTextPrimary)
                        
                        ForEach(cartManager.cartItems, id: \.id) { item in
                            HStack {
                                Text(item.product.name)
                                    .font(.subheadline)
                                    .foregroundColor(.indusaTextPrimary)
                                
                                Spacer()
                                
                                Text("$\(String(format: "%.2f", item.totalPrice))")
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                                    .foregroundColor(.indusaTextPrimary)
                            }
                        }
                        
                        Divider()
                        
                        HStack {
                            Text("Total")
                                .font(.headline)
                                .foregroundColor(.indusaTextPrimary)
                            
                            Spacer()
                            
                            Text(cartManager.formattedTotalPrice)
                                .font(.title3)
                                .fontWeight(.bold)
                                .foregroundColor(.indusaPrimary)
                        }
                    }
                    .padding()
                    .indusaCardStyle()
                    
                    // Payment Button
                    Button("Complete Purchase") {
                        showingSuccess = true
                    }
                    .buttonStyle(IndusaButtonStyle(variant: .primary))
                    .frame(maxWidth: .infinity)
                }
                .padding()
            }
            .navigationTitle("Checkout")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
        .alert("Order Successful!", isPresented: $showingSuccess) {
            Button("OK") {
                cartManager.clearCart()
                dismiss()
            }
        } message: {
            Text("Thank you for your purchase! Your order has been confirmed.")
        }
    }
}

#Preview {
    ApparelView()
        .environmentObject(CartManager())
}
