# Notification Service Extension (NSE) — iOS rich notifications

Cette extension permet d'afficher l'**image** dans les notifications push iOS
(grande vignette du contenu). Android et la PWA l'affichent déjà ; iOS l'exige
via une NSE (limitation Apple).

Le backend envoie déjà ce qu'il faut : APNS `mutable-content: 1` +
`fcm_options.image` (cf. `athena_api/src/providers/notification-service.ts`).
Il reste à **wirer cette extension dans Xcode** (l'édition de `project.pbxproj`
à la main est trop risquée, donc ces étapes sont manuelles, ~5 min).

## Étapes Xcode

1. Ouvrir `ios/App/App.xcworkspace` dans Xcode.
2. **File → New → Target… → Notification Service Extension**.
   - Product Name : `NotificationService`
   - Language : Swift
   - « Embed in Application » : `App`
   - Quand Xcode propose « Activate scheme » : oui.
3. Xcode crée un dossier `NotificationService/` avec un `NotificationService.swift`
   et un `Info.plist`. **Remplacer le contenu du `.swift` généré** par celui
   fourni ici (`NotificationService.swift`) — il utilise le helper Firebase.
   (Tu peux supprimer le dossier dupliqué et pointer le target sur ce fichier-ci,
   ou simplement copier/coller le contenu.)
4. **Deployment target** de l'extension : 14.0 (aligné sur l'app).
5. Sélectionner le target `NotificationService` → onglet **Signing & Capabilities**
   → choisir la **Team** (`3V5QFA3LEY`) ; le bundle id sera
   `com.athena.app.NotificationService` (ou l'app id + `.NotificationService`).

## Podfile

Ajouter ce bloc dans `ios/App/Podfile` **après** `target 'App' do … end`
(une fois le target créé dans Xcode, sinon `pod install` échoue) :

```ruby
target 'NotificationService' do
  pod 'FirebaseMessaging'
end
```

Puis :

```bash
cd ios/App && pod install
```

Le `post_install` existant du Podfile (fix AFNetworking / module verifier)
s'applique déjà à tous les targets, l'extension incluse.

## Vérification

- Builder sur un **device iOS réel** (les push ne marchent pas en simulateur).
- Publier un nouvel article/vidéo (ou envoyer un push de test FCM avec
  `notification.image`) → la notification doit afficher la grande image.
- Si seul le texte s'affiche : vérifier que `mutable-content: 1` est bien dans
  le payload (il l'est dès que le contenu a une image) et que le bundle id de
  l'extension est bien un suffixe de celui de l'app.

## Côté backend (déjà fait)

`NotificationService.createMessage` ajoute, quand le contenu a une image :
`apns.payload.aps.mutableContent = true` et `apns.fcmOptions.imageUrl = <url>`.
Rien à refaire côté serveur.
