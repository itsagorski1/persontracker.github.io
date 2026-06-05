<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Profile - Auth0 Example</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .profile-container { max-width: 600px; margin: 0 auto; }
        .token-section { margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; }
        .logout-btn {
            background-color: #dc3545;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .logout-btn:hover { background-color: #c82333; }
        code { background-color: #e9ecef; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="profile-container">
        <h1>Welcome to Your Profile!</h1>
        <p>You have successfully authenticated with Auth0.</p>

        <div class="token-section">
            <h3>Access Token</h3>
            <p><code>${accessToken}</code></p>
        </div>

        <div class="token-section">
            <h3>ID Token</h3>
            <p><code>${idToken}</code></p>
        </div>

        <a href="/logout" class="logout-btn">Logout</a>
    </div>
</body>
</html>