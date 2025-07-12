import SwiftUI
import PhotosUI

struct TryOnView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var cartManager: CartManager
    @State private var selectedProduct: Product?
    @State private var showingImagePicker = false
    @State private var showingCamera = false
    @State private var showingProductPicker = false
    @State private var selectedImage: UIImage?
    @State private var processedImage: UIImage?
    @State private var isProcessing = false
    @State private var showingShare = false
    
    let selectedProductFromInit: Product?
    
    init(selectedProduct: Product? = nil) {
        self.selectedProductFromInit = selectedProduct
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.indusaBackground.ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        // Header
                        headerSection
                        
                        // Try-On Mode Toggle
                        tryOnModeSection
                        
                        // Product Selection
                        if selectedProduct == nil {
                            productSelectionSection
                        } else {
                            selectedProductSection
                        }
                        
                        // Photo Upload Section
                        photoUploadSection
                        
                        // Processing & Results
                        if isProcessing {
                            processingSection
                        } else if let processedImage = processedImage {
                            resultSection(processedImage)
                        }
                        
                        // Action Buttons
                        if selectedProduct != nil && selectedImage != nil {
                            actionButtonsSection
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Virtual Try-On")
            .navigationBarTitleDisplayMode(.large)
        }
        .onAppear {
            if let product = selectedProductFromInit {
                selectedProduct = product
                appState.selectedProduct = product
                appState.tryOnMode = product.category == .clothing ? .clothing : .decor
            }
        }
        .sheet(isPresented: $showingImagePicker) {
            ImagePicker(selectedImage: $selectedImage)
        }
        .sheet(isPresented: $showingCamera) {
            CameraView(selectedImage: $selectedImage)
        }
        .sheet(isPresented: $showingProductPicker) {
            ProductPickerView(selectedProduct: $selectedProduct)
        }
        .sheet(isPresented: $showingShare) {
            if let image = processedImage {
                ShareSheet(items: [image])
            }
        }
    }
    
    private var headerSection: some View {
        VStack(spacing: 8) {
            Text("✨ AI-Powered Virtual Try-On")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.indusaTextPrimary)
            
            Text("See how products look on you or in your space")
                .font(.subheadline)
                .foregroundColor(.indusaTextSecondary)
                .multilineTextAlignment(.center)
        }
    }
    
    private var tryOnModeSection: some View {
        Picker("Try-On Mode", selection: $appState.tryOnMode) {
            Text("Clothing").tag(AppState.TryOnMode.clothing)
            Text("Home Decor").tag(AppState.TryOnMode.decor)
        }
        .pickerStyle(SegmentedPickerStyle())
        .padding(.horizontal)
    }
    
    private var productSelectionSection: some View {
        VStack(spacing: 16) {
            Text("Select a Product")
                .font(.headline)
                .foregroundColor(.indusaTextPrimary)
            
            Button(action: { showingProductPicker = true }) {
                VStack(spacing: 12) {
                    Image(systemName: appState.tryOnMode == .clothing ? "tshirt" : "sofa")
                        .font(.system(size: 40))
                        .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                    
                    Text("Choose \(appState.tryOnMode == .clothing ? "Clothing" : "Home Decor")")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.indusaPrimary)
                }
                .padding(30)
                .frame(maxWidth: .infinity)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.indusaPrimary, lineWidth: 2, lineCap: .round)
                        .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [5]))
                )
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    private var selectedProductSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Selected Product")
                    .font(.headline)
                    .foregroundColor(.indusaTextPrimary)
                
                Spacer()
                
                Button("Change") {
                    showingProductPicker = true
                }
                .font(.subheadline)
                .foregroundColor(.indusaPrimary)
            }
            
            if let product = selectedProduct {
                HStack(spacing: 12) {
                    AsyncImage(url: URL(string: product.imageURL)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Rectangle()
                            .fill(Color.gray.opacity(0.2))
                    }
                    .frame(width: 60, height: 60)
                    .cornerRadius(8)
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text(product.name)
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(.indusaTextPrimary)
                        
                        Text(product.brand)
                            .font(.caption)
                            .foregroundColor(.indusaTextSecondary)
                        
                        Text(product.formattedPrice)
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundColor(.indusaPrimary)
                    }
                    
                    Spacer()
                }
                .padding()
                .indusaCardStyle()
            }
        }
    }
    
    private var photoUploadSection: some View {
        VStack(spacing: 16) {
            Text("Upload Your Photo")
                .font(.headline)
                .foregroundColor(.indusaTextPrimary)
            
            if let selectedImage = selectedImage {
                VStack(spacing: 12) {
                    Image(uiImage: selectedImage)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxHeight: 200)
                        .cornerRadius(12)
                    
                    Button("Change Photo") {
                        showPhotoOptions()
                    }
                    .font(.subheadline)
                    .foregroundColor(.indusaPrimary)
                }
            } else {
                Button(action: showPhotoOptions) {
                    VStack(spacing: 12) {
                        Image(systemName: "camera.fill")
                            .font(.system(size: 40))
                            .foregroundStyle(LinearGradient.indusaGradientHorizontal)
                        
                        Text("Take Photo or Choose from Library")
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(.indusaPrimary)
                    }
                    .padding(30)
                    .frame(maxWidth: .infinity)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.indusaPrimary, lineWidth: 2, lineCap: .round)
                            .strokeBorder(style: StrokeStyle(lineWidth: 2, dash: [5]))
                    )
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
    }
    
    private var processingSection: some View {
        VStack(spacing: 16) {
            ProgressView()
                .progressViewStyle(CircularProgressViewStyle(tint: .indusaPrimary))
                .scaleEffect(1.5)
            
            Text("Processing with AI...")
                .font(.subheadline)
                .foregroundColor(.indusaTextSecondary)
        }
        .padding(40)
        .indusaCardStyle()
    }
    
    private func resultSection(_ image: UIImage) -> some View {
        VStack(spacing: 16) {
            Text("✨ Your Virtual Try-On Result")
                .font(.headline)
                .foregroundColor(.indusaTextPrimary)
            
            Image(uiImage: image)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .cornerRadius(12)
                .shadow(radius: 4)
            
            HStack(spacing: 16) {
                Button(action: { showingShare = true }) {
                    HStack(spacing: 8) {
                        Image(systemName: "square.and.arrow.up")
                        Text("Share")
                    }
                }
                .buttonStyle(IndusaButtonStyle(variant: .outline))
                
                if let product = selectedProduct {
                    Button(action: { addToCart(product) }) {
                        HStack(spacing: 8) {
                            Image(systemName: "bag.badge.plus")
                            Text("Add to Cart")
                        }
                    }
                    .buttonStyle(IndusaButtonStyle(variant: .primary))
                }
            }
        }
    }
    
    private var actionButtonsSection: some View {
        Button(action: processTryOn) {
            HStack(spacing: 8) {
                Image(systemName: "sparkles")
                Text("Generate Try-On")
                    .fontWeight(.semibold)
            }
        }
        .buttonStyle(IndusaButtonStyle(variant: .primary))
        .disabled(isProcessing)
    }
    
    private func showPhotoOptions() {
        let alert = UIAlertController(title: "Select Photo", message: nil, preferredStyle: .actionSheet)
        
        alert.addAction(UIAlertAction(title: "Camera", style: .default) { _ in
            showingCamera = true
        })
        
        alert.addAction(UIAlertAction(title: "Photo Library", style: .default) { _ in
            showingImagePicker = true
        })
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let rootViewController = windowScene.windows.first?.rootViewController {
            rootViewController.present(alert, animated: true)
        }
    }
    
    private func processTryOn() {
        guard selectedProduct != nil, selectedImage != nil else { return }
        
        isProcessing = true
        
        // Simulate AI processing
        DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
            // For demo purposes, we'll use the original image as processed
            processedImage = selectedImage
            isProcessing = false
        }
    }
    
    private func addToCart(_ product: Product) {
        cartManager.addToCart(product)
    }
}

// MARK: - Supporting Views

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var selectedImage: UIImage?
    @Environment(\.dismiss) private var dismiss
    
    func makeUIViewController(context: Context) -> PHPickerViewController {
        var config = PHPickerConfiguration()
        config.filter = .images
        config.selectionLimit = 1
        
        let picker = PHPickerViewController(configuration: config)
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: PHPickerViewController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, PHPickerViewControllerDelegate {
        let parent: ImagePicker
        
        init(_ parent: ImagePicker) {
            self.parent = parent
        }
        
        func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
            picker.dismiss(animated: true)
            
            guard let provider = results.first?.itemProvider else { return }
            
            if provider.canLoadObject(ofClass: UIImage.self) {
                provider.loadObject(ofClass: UIImage.self) { image, _ in
                    DispatchQueue.main.async {
                        self.parent.selectedImage = image as? UIImage
                    }
                }
            }
        }
    }
}

struct CameraView: UIViewControllerRepresentable {
    @Binding var selectedImage: UIImage?
    @Environment(\.dismiss) private var dismiss
    
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        picker.sourceType = .camera
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let parent: CameraView
        
        init(_ parent: CameraView) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let image = info[.originalImage] as? UIImage {
                parent.selectedImage = image
            }
            parent.dismiss()
        }
        
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            parent.dismiss()
        }
    }
}

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

#Preview {
    TryOnView()
        .environmentObject(AppState())
        .environmentObject(CartManager())
}
