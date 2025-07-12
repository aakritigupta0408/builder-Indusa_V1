import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authManager: AuthManager
    @State private var email = ""
    @State private var password = ""
    @State private var name = ""
    @State private var isSignUp = false
    @State private var showingAlert = false
    
    var body: some View {
        ZStack {
            // Background Gradient
            LinearGradient.indusaGradient
                .ignoresSafeArea()
            
            VStack(spacing: 30) {
                Spacer()
                
                // Logo and Branding
                VStack(spacing: 16) {
                    Image(systemName: "sparkles")
                        .font(.system(size: 60))
                        .foregroundColor(.white)
                    
                    Text("INDUSA")
                        .font(.largeTitle)
                        .fontWeight(.black)
                        .foregroundColor(.white)
                    
                    Text("Made by Humans • Delivered By AI")
                        .font(.subheadline)
                        .foregroundColor(.white.opacity(0.8))
                        .textCase(.uppercase)
                        .tracking(1)
                }
                
                Spacer()
                
                // Login Form
                VStack(spacing: 20) {
                    if isSignUp {
                        TextField("Full Name", text: $name)
                            .textFieldStyle(IndusaTextFieldStyle())
                    }
                    
                    TextField("Email", text: $email)
                        .textFieldStyle(IndusaTextFieldStyle())
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    
                    SecureField("Password", text: $password)
                        .textFieldStyle(IndusaTextFieldStyle())
                    
                    Button(action: authenticate) {
                        if authManager.isLoading {
                            HStack {
                                ProgressView()
                                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                    .scaleEffect(0.8)
                                Text("Please wait...")
                                    .fontWeight(.semibold)
                            }
                        } else {
                            Text(isSignUp ? "Create Account" : "Sign In")
                                .fontWeight(.semibold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                    .background(Color.white)
                    .foregroundColor(.indusaPrimary)
                    .cornerRadius(12)
                    .disabled(authManager.isLoading || !isFormValid)
                    .opacity((authManager.isLoading || !isFormValid) ? 0.6 : 1.0)
                    
                    Button(action: { isSignUp.toggle() }) {
                        Text(isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up")
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                    .disabled(authManager.isLoading)
                }
                .padding(.horizontal, 30)
                
                Spacer()
                
                // Guest Option
                Button(action: guestSignIn) {
                    Text("Continue as Guest")
                        .font(.subheadline)
                        .foregroundColor(.white.opacity(0.8))
                        .underline()
                }
                .padding(.bottom, 30)
            }
        }
        .alert("Authentication Error", isPresented: $showingAlert) {
            Button("OK") { }
        } message: {
            Text(authManager.errorMessage ?? "An error occurred")
        }
        .onChange(of: authManager.errorMessage) { errorMessage in
            if errorMessage != nil {
                showingAlert = true
            }
        }
    }
    
    private var isFormValid: Bool {
        if isSignUp {
            return !name.isEmpty && !email.isEmpty && password.count >= 6
        } else {
            return !email.isEmpty && !password.isEmpty
        }
    }
    
    private func authenticate() {
        if isSignUp {
            authManager.signUp(name: name, email: email, password: password)
        } else {
            authManager.signIn(email: email, password: password)
        }
    }
    
    private func guestSignIn() {
        authManager.signIn(email: "guest@indusa.ai", password: "guest123")
    }
}

struct IndusaTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .padding(15)
            .background(Color.white.opacity(0.9))
            .cornerRadius(10)
            .foregroundColor(.indusaTextPrimary)
    }
}

#Preview {
    LoginView()
        .environmentObject(AuthManager())
}
