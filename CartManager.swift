import SwiftUI
import Combine

class CartManager: ObservableObject {
    @Published var cartItems: [CartItem] = []
    @Published var wishlist: [Product] = []
    
    var totalItems: Int {
        cartItems.reduce(0) { $0 + $1.quantity }
    }
    
    var totalPrice: Double {
        cartItems.reduce(0) { $0 + $1.totalPrice }
    }
    
    var formattedTotalPrice: String {
        "$\(String(format: "%.2f", totalPrice))"
    }
    
    func addToCart(_ product: Product, quantity: Int = 1, selectedSize: String? = nil, selectedColor: String? = nil) {
        if let index = cartItems.firstIndex(where: { 
            $0.product.id == product.id && 
            $0.selectedSize == selectedSize && 
            $0.selectedColor == selectedColor 
        }) {
            cartItems[index].quantity += quantity
        } else {
            let cartItem = CartItem(
                product: product,
                quantity: quantity,
                selectedSize: selectedSize,
                selectedColor: selectedColor
            )
            cartItems.append(cartItem)
        }
        saveCart()
    }
    
    func removeFromCart(_ cartItem: CartItem) {
        cartItems.removeAll { $0.id == cartItem.id }
        saveCart()
    }
    
    func updateQuantity(for cartItem: CartItem, quantity: Int) {
        if let index = cartItems.firstIndex(where: { $0.id == cartItem.id }) {
            if quantity <= 0 {
                cartItems.remove(at: index)
            } else {
                cartItems[index].quantity = quantity
            }
        }
        saveCart()
    }
    
    func clearCart() {
        cartItems.removeAll()
        saveCart()
    }
    
    func addToWishlist(_ product: Product) {
        if !wishlist.contains(where: { $0.id == product.id }) {
            wishlist.append(product)
            saveWishlist()
        }
    }
    
    func removeFromWishlist(_ product: Product) {
        wishlist.removeAll { $0.id == product.id }
        saveWishlist()
    }
    
    func isInWishlist(_ product: Product) -> Bool {
        wishlist.contains { $0.id == product.id }
    }
    
    private func saveCart() {
        if let data = try? JSONEncoder().encode(cartItems) {
            UserDefaults.standard.set(data, forKey: "cart_items")
        }
    }
    
    private func loadCart() {
        if let data = UserDefaults.standard.data(forKey: "cart_items"),
           let items = try? JSONDecoder().decode([CartItem].self, from: data) {
            cartItems = items
        }
    }
    
    private func saveWishlist() {
        if let data = try? JSONEncoder().encode(wishlist) {
            UserDefaults.standard.set(data, forKey: "wishlist")
        }
    }
    
    private func loadWishlist() {
        if let data = UserDefaults.standard.data(forKey: "wishlist"),
           let products = try? JSONDecoder().decode([Product].self, from: data) {
            wishlist = products
        }
    }
    
    init() {
        loadCart()
        loadWishlist()
    }
}
