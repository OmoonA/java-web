package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.vertx.ext.web.RoutingContext;

@Path("/") // 기본 경로가 최상위 /
public class AuthResource {
    // GET /login → 로그인 HTML 페이지 반환
    @GET
    @Path("/login") // 경로 명시
    @Produces(MediaType.TEXT_HTML) // 서버 → 클라
    public Response loginPage() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/login.html");
        return Response.ok(html).build();
    }

    @Inject
    RoutingContext context;

    @POST // 아이디, 패스워드 전송받음
    @Path("/login_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
            @FormParam("username") String username,
            @FormParam("password") String password) {
        User user = User.findByUsername(username); // 아이디 조회
        if (user == null || !user.password.equals(password)) { // 존재 확인
            return Response
                    .seeOther(URI.create("/login?error=1"))
                    .build();
        }
        // 세션에 로그인 정보 저장
        context.session().put("loginUser", username);
        return Response
                .seeOther(URI.create("/after_login"))
                .build();
    }
}