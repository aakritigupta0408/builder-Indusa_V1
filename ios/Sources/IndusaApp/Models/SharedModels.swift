import SwiftUI
import Foundation

// MARK: - iOS-specific versions of shared models
// These models mirror the TypeScript interfaces in shared-resources/models.ts

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
    
    var discountPercentage: Int {
        guard let originalPrice = originalPrice, originalPrice > price else { return 0 }
        return Int(((originalPrice - price) / originalPrice) * 100)
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
    
    var formattedTotalPrice: String {
        "$\(String(format: "%.2f", totalPrice))"
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
    
    var formattedStartingPrice: String {
        "$\(String(format: "%.0f", startingPrice))"
    }
}

// MARK: - Search and Filter Models
struct SearchFilters {
    var category: ProductCategory?
    var priceRange: ClosedRange<Double>?
    var brands: Set<String>
    var colors: Set<String>
    var sizes: Set<String>
    var sortBy: SortOption
    
    init() {
        self.category = nil
        self.priceRange = nil
        self.brands = Set<String>()
        self.colors = Set<String>()
        self.sizes = Set<String>()
        self.sortBy = .popular
    }
}

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

// MARK: - App State Models
enum TryOnMode {
    case clothing, decor
}

// MARK: - API Response Models
struct APIResponse<T: Codable>: Codable {
    let success: Bool
    let data: T?
    let error: String?
    let message: String?
}

struct PaginatedResponse<T: Codable>: Codable {
    let items: [T]
    let total: Int
    let page: Int
    let limit: Int
    let hasMore: Bool
}

// MARK: - AI and Recommendation Models
struct AIRecommendation: Codable {
    let product: Product
    let reason: String
    let confidence: Double
    
    var formattedConfidence: String {
        "\(Int(confidence * 100))%"
    }
}

struct SizeRecommendation: Codable {
    let brand: String
    let size: String
    let confidence: Double
    let measurements: [String: Double]?
    
    var formattedConfidence: String {
        "\(Int(confidence * 100))%"
    }
}

// MARK: - Measurement Models
struct Measurement {
    let key: String
    let label: String
    let unit: String
    let value: Double?
    let min: Double
    let max: Double
}

// MARK: - Introduction Models
struct IntroPage {
    let title: String
    let subtitle: String
    let description: String
    let imageName: String
    let gradient: LinearGradient
}

// MARK: - Extension for shared constants
extension Product {
    static let maxImageSizeMB = 10.0
    static let supportedImageFormats = ["jpg", "jpeg", "png", "webp"]
}

extension User {
    var displayInitials: String {
        let names = name.split(separator: " ")
        if names.count >= 2 {
            return "\(names[0].prefix(1))\(names[1].prefix(1))".uppercased()
        } else {
            return String(name.prefix(2)).uppercased()
        }
    }
}

// MARK: - Error Types
enum IndusaError: LocalizedError {
    case networkError
    case invalidCredentials
    case productNotFound
    case imageProcessingFailed
    case sizingFailed
    case cartFull
    case invalidImageFormat
    
    var errorDescription: String? {
        switch self {
        case .networkError:
            return "Network connection error. Please check your internet connection."
        case .invalidCredentials:
            return "Invalid email or password."
        case .productNotFound:
            return "Product not found."
        case .imageProcessingFailed:
            return "Virtual try-on failed. Please try with a different image."
        case .sizingFailed:
            return "Size recommendation failed. Please check your measurements."
        case .cartFull:
            return "Your cart is full. Please remove some items."
        case .invalidImageFormat:
            return "Invalid image format. Please select a JPG, PNG, or WEBP image."
        }
    }
}
