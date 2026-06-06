package com.auth0.example;

import com.auth0.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/profile"})
public class ProfileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        String accessToken = (String) SessionUtils.get(req, "accessToken");
        String idToken = (String) SessionUtils.get(req, "idToken");

        if (accessToken == null || idToken == null) {
            res.sendRedirect("/login?error=auth_failed");
            return;
        }

        req.setAttribute("accessToken", accessToken);
        req.setAttribute("idToken", idToken);
        req.getRequestDispatcher("/WEB-INF/jsp/profile.jsp").forward(req, res);
    }
}
