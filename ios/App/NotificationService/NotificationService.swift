import UserNotifications
import FirebaseMessaging

/// Notification Service Extension — active les notifications enrichies (image)
/// sur iOS.
///
/// Le backend envoie côté APNS `mutable-content: 1` + l'URL d'image
/// (`fcm_options.image`). iOS réveille alors cette extension AVANT d'afficher la
/// notification ; le helper Firebase télécharge l'image et l'attache au contenu.
/// Sans cette extension, iOS ignore l'image et n'affiche que le texte.
final class NotificationService: UNNotificationServiceExtension {
    private var contentHandler: ((UNNotificationContent) -> Void)?
    private var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
    ) {
        self.contentHandler = contentHandler
        bestAttemptContent = request.content.mutableCopy() as? UNMutableNotificationContent

        guard let bestAttemptContent = bestAttemptContent else {
            contentHandler(request.content)
            return
        }

        // Télécharge l'image fournie par FCM (fcm_options.image) et l'attache.
        Messaging.serviceExtension().populateNotificationContent(
            bestAttemptContent,
            withContentHandler: contentHandler
        )
    }

    override func serviceExtensionTimeWillExpire() {
        // Délai dépassé : on affiche au moins le contenu texte récupéré.
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}
