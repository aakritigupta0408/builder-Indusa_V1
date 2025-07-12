import SwiftUI
import Foundation

// MARK: - Product Models
struct Product: Identifiable, Codable, Hashable {
    let id: Int
    let name: String
    let price: Double
    let originalPrice: Double?
    let brand: String
    let color: String
    let availableColors: [String]?
    let category: ProductCategory
    let subcategory: String?
    let imageURL: String
    let images: [String: String]?
    let rating: Double
    let reviews: Int?
    let sizes: [String]?
    let material: String?
    let isNew: Bool
    let onSale: Bool
    
    var formattedPrice: String {
        "$\(String(format: "%.2f", price))"
    }
    
    var formattedOriginalPrice: String? {
        guard let originalPrice = originalPrice else { return nil }
        return "$\(String(format: "%.2f", originalPrice))"
    }
}

enum ProductCategory: String, CaseIterable, Codable {
    case clothing = "clothing"
    case decor = "decor"
    
    var displayName: String {
        switch self {
        case .clothing: return "Apparel"
        case .decor: return "Home & Decor"
        }
    }
}

// MARK: - Cart Models
struct CartItem: Identifiable, Codable {
    let id = UUID()
    let product: Product
    var quantity: Int
    var selectedSize: String?
    var selectedColor: String?
    
    var totalPrice: Double {
        product.price * Double(quantity)
    }
}

// MARK: - User Models
struct User: Identifiable, Codable {
    let id: String
    let name: String
    let email: String
    let avatarURL: String?
    let createdAt: Date
    
    init(id: String, name: String, email: String, avatarURL: String? = nil) {
        self.id = id
        self.name = name
        self.email = email
        self.avatarURL = avatarURL
        self.createdAt = Date()
    }
}

// MARK: - Wardrobe Models
struct WardrobeItem: Identifiable, Codable {
    let id = UUID()
    let product: Product
    let purchaseDate: Date?
    let isPersonalItem: Bool
    let tags: [String]?
    
    var itemType: String {
        isPersonalItem ? "Personal" : "Purchased"
    }
}

struct StyleOutfit: Identifiable, Codable {
    let id = UUID()
    var name: String
    let items: [WardrobeItem]
    let createdAt: Date
    var occasion: String?
    
    init(name: String, items: [WardrobeItem], occasion: String? = nil) {
        self.name = name
        self.items = items
        self.occasion = occasion
        self.createdAt = Date()
    }
}

// MARK: - Designer Models
struct Designer: Identifiable, Codable {
    let id: Int
    let name: String
    let description: String
    let imageURL: String
    let coverImageURL: String
    let specialty: [String]
    let founded: String
    let location: String
    let website: String?
    let social: SocialLinks?
    let featuredIn: [String]?
    let totalProducts: Int
    let customClothes: CustomClothesInfo?
}

struct SocialLinks: Codable {
    let instagram: String?
    let twitter: String?
}

struct CustomClothesInfo: Codable {
    let available: Bool
    let startingPrice: Double
    let deliveryTime: String
    let description: String
    let categories: [String]
}

// MARK: - Search and Filter Models
struct SearchFilters {
    var category: ProductCategory?
    var priceRange: ClosedRange<Double>?
    var brands: Set<String>
    var colors: Set<String>
    var sizes: Set<String>
    var sortBy: SortOption
    
    enum SortOption: String, CaseIterable {
        case popular = "popular"
        case newest = "newest"
        case priceLow = "price-low"
        case priceHigh = "price-high"
        
        var displayName: String {
            switch self {
            case .popular: return "Most Popular"
            case .newest: return "Newest"
            case .priceLow: return "Price: Low to High"
            case .priceHigh: return "Price: High to Low"
            }
        }
    }
}
