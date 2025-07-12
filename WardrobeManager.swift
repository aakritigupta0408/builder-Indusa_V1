import SwiftUI
import Combine

class WardrobeManager: ObservableObject {
    @Published var wardrobeItems: [WardrobeItem] = []
    @Published var savedOutfits: [StyleOutfit] = []
    @Published var selectedItems: [WardrobeItem] = []
    
    var purchasedItems: [WardrobeItem] {
        wardrobeItems.filter { !$0.isPersonalItem }
    }
    
    var personalItems: [WardrobeItem] {
        wardrobeItems.filter { $0.isPersonalItem }
    }
    
    func addPurchasedItem(_ product: Product, purchaseDate: Date = Date()) {
        let wardrobeItem = WardrobeItem(
            product: product,
            purchaseDate: purchaseDate,
            isPersonalItem: false,
            tags: nil
        )
        wardrobeItems.append(wardrobeItem)
        saveWardrobe()
    }
    
    func addPersonalItem(_ product: Product, tags: [String]? = nil) {
        let wardrobeItem = WardrobeItem(
            product: product,
            purchaseDate: nil,
            isPersonalItem: true,
            tags: tags
        )
        wardrobeItems.append(wardrobeItem)
        saveWardrobe()
    }
    
    func removeItem(_ item: WardrobeItem) {
        wardrobeItems.removeAll { $0.id == item.id }
        saveWardrobe()
    }
    
    func addToStyleStudio(_ item: WardrobeItem) {
        if !selectedItems.contains(where: { $0.id == item.id }) {
            selectedItems.append(item)
        }
    }
    
    func removeFromStyleStudio(_ item: WardrobeItem) {
        selectedItems.removeAll { $0.id == item.id }
    }
    
    func clearStyleStudio() {
        selectedItems.removeAll()
    }
    
    func saveOutfit(name: String, occasion: String? = nil) {
        guard !selectedItems.isEmpty else { return }
        
        let outfit = StyleOutfit(
            name: name,
            items: selectedItems,
            occasion: occasion
        )
        savedOutfits.append(outfit)
        selectedItems.removeAll()
        saveOutfits()
    }
    
    func deleteOutfit(_ outfit: StyleOutfit) {
        savedOutfits.removeAll { $0.id == outfit.id }
        saveOutfits()
    }
    
    func searchItems(query: String, category: ProductCategory? = nil) -> [WardrobeItem] {
        var filteredItems = wardrobeItems
        
        if let category = category {
            filteredItems = filteredItems.filter { $0.product.category == category }
        }
        
        if !query.isEmpty {
            filteredItems = filteredItems.filter {
                $0.product.name.localizedCaseInsensitiveContains(query) ||
                $0.product.brand.localizedCaseInsensitiveContains(query) ||
                $0.product.color.localizedCaseInsensitiveContains(query)
            }
        }
        
        return filteredItems
    }
    
    private func saveWardrobe() {
        if let data = try? JSONEncoder().encode(wardrobeItems) {
            UserDefaults.standard.set(data, forKey: "wardrobe_items")
        }
    }
    
    private func loadWardrobe() {
        if let data = UserDefaults.standard.data(forKey: "wardrobe_items"),
           let items = try? JSONDecoder().decode([WardrobeItem].self, from: data) {
            wardrobeItems = items
        }
    }
    
    private func saveOutfits() {
        if let data = try? JSONEncoder().encode(savedOutfits) {
            UserDefaults.standard.set(data, forKey: "saved_outfits")
        }
    }
    
    private func loadOutfits() {
        if let data = UserDefaults.standard.data(forKey: "saved_outfits"),
           let outfits = try? JSONDecoder().decode([StyleOutfit].self, from: data) {
            savedOutfits = outfits
        }
    }
    
    init() {
        loadWardrobe()
        loadOutfits()
        loadMockData()
    }
    
    private func loadMockData() {
        // Add some mock purchased items if wardrobe is empty
        if wardrobeItems.isEmpty {
            let mockProducts = MockData.sampleProducts
            for product in mockProducts.prefix(3) {
                addPurchasedItem(product, purchaseDate: Calendar.current.date(byAdding: .day, value: -Int.random(in: 1...30), to: Date()) ?? Date())
            }
        }
    }
}
