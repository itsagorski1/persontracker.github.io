package com.auth0.example;

import com.auth0.AuthenticationController;
import com.auth0.IdentityVerificationException;
import com.auth0.SessionUtils;
import com.auth0.Tokens;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@WebServlet(urlPatterns = {"/callback"})
public class CallbackServlet extends HttpServlet {

    private AuthenticationController authenticationController;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        try {
            authenticationController = AuthenticationControllerProvider.getInstance(config);
        } catch (UnsupportedEncodingException e) {
            throw new ServletException("Couldn't create the AuthenticationController instance. Check the configuration.", e);
        }
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        handleCallback(req, res);
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        handleCallback(req, res);
    }

    private void handleCallback(HttpServletRequest req, HttpServletResponse res)
            throws IOException {
        try {
            // Process the authentication callback
            Tokens tokens = authenticationController.handle(req, res);

            // Store tokens in session
            SessionUtils.set(req, "accessToken", tokens.getAccessToken());
            SessionUtils.set(req, "idToken", tokens.getIdToken());

            // Redirect to secure area
            res.sendRedirect("/profile");
        } catch (IdentityVerificationException e) {
            // Authentication failed
            e.printStackTrace();
            res.sendRedirect("/login?error=auth_failed");
        }
    }
}