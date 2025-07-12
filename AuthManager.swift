import SwiftUI
import Combine

class AuthManager: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        checkAuthenticationStatus()
    }
    
    func signIn(email: String, password: String) {
        isLoading = true
        errorMessage = nil
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            // Mock successful login
            self.currentUser = User(
                id: UUID().uuidString,
                name: "Aakriti Gupta",
                email: email,
                avatarURL: "https://api.dicebear.com/7.x/avataaars/png?seed=\(email)"
            )
            self.isAuthenticated = true
            self.isLoading = false
            self.saveAuthenticationState()
        }
    }
    
    func signUp(name: String, email: String, password: String) {
        isLoading = true
        errorMessage = nil
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            // Mock successful signup
            self.currentUser = User(
                id: UUID().uuidString,
                name: name,
                email: email,
                avatarURL: "https://api.dicebear.com/7.x/avataaars/png?seed=\(email)"
            )
            self.isAuthenticated = true
            self.isLoading = false
            self.saveAuthenticationState()
        }
    }
    
    func signOut() {
        isAuthenticated = false
        currentUser = nil
        clearAuthenticationState()
    }
    
    private func checkAuthenticationStatus() {
        // Check if user is already authenticated
        if let userData = UserDefaults.standard.data(forKey: "current_user"),
           let user = try? JSONDecoder().decode(User.self, from: userData) {
            currentUser = user
            isAuthenticated = true
        }
    }
    
    private func saveAuthenticationState() {
        guard let user = currentUser else { return }
        if let userData = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(userData, forKey: "current_user")
        }
    }
    
    private func clearAuthenticationState() {
        UserDefaults.standard.removeObject(forKey: "current_user")
    }
}
