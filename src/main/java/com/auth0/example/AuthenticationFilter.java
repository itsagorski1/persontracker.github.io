package com.auth0.example;

import com.auth0.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/logout"})
public class LogoutServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        // Clear session
        SessionUtils.set(req, "accessToken", null);
        SessionUtils.set(req, "idToken", null);
        req.getSession().invalidate();

        // Redirect to login

        res.sendRedirect("/login");
    }
}