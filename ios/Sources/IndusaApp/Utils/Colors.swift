import SwiftUI

extension Color {
    // Indusa Brand Colors
    static let indusaPrimary = Color(red: 0.8, green: 0.2, blue: 0.6) // Pink-Purple
    static let indusaSecondary = Color(red: 0.4, green: 0.2, blue: 0.8) // Purple
    static let indusaAccent = Color(red: 0.2, green: 0.8, blue: 0.8) // Cyan
    
    // Gradient Colors
    static let indusaGradientStart = Color(red: 0.8, green: 0.2, blue: 0.6)
    static let indusaGradientMiddle = Color(red: 0.6, green: 0.3, blue: 0.8)
    static let indusaGradientEnd = Color(red: 0.2, green: 0.8, blue: 0.8)
    
    // Background Colors
    static let indusaBackground = Color(red: 0.98, green: 0.96, blue: 0.98)
    static let indusaCardBackground = Color.white
    
    // Text Colors
    static let indusaTextPrimary = Color(red: 0.1, green: 0.1, blue: 0.1)
    static let indusaTextSecondary = Color(red: 0.4, green: 0.4, blue: 0.4)
    static let indusaTextMuted = Color(red: 0.6, green: 0.6, blue: 0.6)
}

extension LinearGradient {
    static let indusaGradient = LinearGradient(
        colors: [.indusaGradientStart, .indusaGradientMiddle, .indusaGradientEnd],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let indusaGradientHorizontal = LinearGradient(
        colors: [.indusaGradientStart, .indusaGradientEnd],
        startPoint: .leading,
        endPoint: .trailing
    )
}

// MARK: - Custom Modifiers
struct IndusaCardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Color.indusaCardBackground)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }
}

struct IndusaButtonStyle: ButtonStyle {
    let variant: Variant
    
    enum Variant {
        case primary, secondary, outline
    }
    
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 16, weight: .semibold))
            .foregroundColor(textColor)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(backgroundColor)
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(borderColor, lineWidth: variant == .outline ? 1 : 0)
            )
            .cornerRadius(8)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
    
    private var backgroundColor: some View {
        Group {
            switch variant {
            case .primary:
                LinearGradient.indusaGradientHorizontal
            case .secondary:
                Color.indusaSecondary.opacity(0.1)
            case .outline:
                Color.clear
            }
        }
    }
    
    private var textColor: Color {
        switch variant {
        case .primary: return .white
        case .secondary: return .indusaSecondary
        case .outline: return .indusaPrimary
        }
    }
    
    private var borderColor: Color {
        switch variant {
        case .primary, .secondary: return .clear
        case .outline: return .indusaPrimary
        }
    }
}

extension View {
    func indusaCardStyle() -> some View {
        modifier(IndusaCardStyle())
    }
}
