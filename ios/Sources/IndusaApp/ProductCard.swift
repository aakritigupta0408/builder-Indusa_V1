import SwiftUI

struct ProductCard: View {
    let product: Product
    @EnvironmentObject var cartManager: CartManager
    @State private var isAddedToCart = false
    @State private var showingTryOn = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Product Image
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: product.imageURL)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color.gray.opacity(0.2))
                        .overlay(
                            Image(systemName: "photo")
                                .foregroundColor(.gray)
                        )
                }
                .frame(width: 160, height: 200)
                .clipped()
                .cornerRadius(12)
                
                // Badges
                VStack(alignment: .trailing, spacing: 4) {
                    if product.isNew {
                        Text("NEW")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.indusaPrimary)
                            .cornerRadius(4)
                    }
                    
                    if product.onSale {
                        Text("SALE")
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.red)
                            .cornerRadius(4)
                    }
                }
                .padding(8)
                
                // Wishlist Button
                VStack {
                    Spacer()
                    HStack {
                        Spacer()
                        Button(action: toggleWishlist) {
                            Image(systemName: cartManager.isInWishlist(product) ? "heart.fill" : "heart")
                                .font(.title3)
                                .foregroundColor(cartManager.isInWishlist(product) ? .red : .white)
                                .frame(width: 32, height: 32)
                                .background(Color.black.opacity(0.6))
                                .clipShape(Circle())
                        }
                        .padding(8)
                    }
                }
            }
            
            // Product Info
            VStack(alignment: .leading, spacing: 4) {
                Text(product.name)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .lineLimit(2)
                    .foregroundColor(.indusaTextPrimary)
                
                Text(product.brand)
                    .font(.caption)
                    .foregroundColor(.indusaTextSecondary)
                
                HStack {
                    if let reviews = product.reviews {
                        HStack(spacing: 2) {
                            Image(systemName: "star.fill")
                                .foregroundColor(.yellow)
                                .font(.caption2)
                            Text("\(product.rating, specifier: "%.1f") (\(reviews))")
                                .font(.caption2)
                                .foregroundColor(.indusaTextSecondary)
                        }
                    }
                    
                    Spacer()
                    
                    Text(product.color)
                        .font(.caption2)
                        .foregroundColor(.indusaTextSecondary)
                }
                
                // Price
                HStack(alignment: .bottom, spacing: 4) {
                    Text(product.formattedPrice)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.indusaTextPrimary)
                    
                    if let originalPrice = product.formattedOriginalPrice {
                        Text(originalPrice)
                            .font(.caption)
                            .strikethrough()
                            .foregroundColor(.indusaTextSecondary)
                    }
                }
            }
            
            // Action Buttons
            HStack(spacing: 8) {
                Button(action: addToCart) {
                    HStack(spacing: 4) {
                        Image(systemName: isAddedToCart ? "checkmark" : "bag.badge.plus")
                            .font(.caption)
                        Text(isAddedToCart ? "Added" : "Add")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(isAddedToCart ? Color.green : Color.indusaPrimary)
                    .cornerRadius(6)
                }
                .animation(.easeInOut(duration: 0.2), value: isAddedToCart)
                
                Button(action: { showingTryOn = true }) {
                    HStack(spacing: 4) {
                        Image(systemName: "sparkles")
                            .font(.caption)
                        Text("Try On")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                    .foregroundColor(.indusaPrimary)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .overlay(
                        RoundedRectangle(cornerRadius: 6)
                            .stroke(Color.indusaPrimary, lineWidth: 1)
                    )
                }
            }
        }
        .frame(width: 160)
        .indusaCardStyle()
        .sheet(isPresented: $showingTryOn) {
            TryOnView(selectedProduct: product)
        }
    }
    
    private func addToCart() {
        cartManager.addToCart(product)
        isAddedToCart = true
        
        // Reset after animation
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
}

#Preview {
    ProductCard(product: MockData.sampleProducts[0])
        .environmentObject(CartManager())
}
