package ProjectsManagmentBackEnd.utils;



import ProjectsManagmentBackEnd.entity.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {

    static final String CLAIM_KEY_USERNAME = "sub";
    static final String CLAIM_KEY_CREATED = "iat";
    private static final long serialVersionUID = -3301605591108950415L;
  //  private Clock clock = DefaultClock.INSTANCE;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.refreshTokenExpiration}")
    private Long refreshTokenExpiration;
    @Value("${jwt.accessTokenExpiration}")
    private Long accessTokenExpiration;
    @Value("${jwt.resetPasswordTokenExpiration}")
    private Long resetPasswordTokenExpiration;

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e) {
            // Get Claims from expired token
            return e.getClaims();
        }



    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date(System.currentTimeMillis()));
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }

    private Boolean ignoreTokenExpiration(String token) {
        // here you specify tokens, for that the expiration is ignored
        return false;
    }

    public String generateToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user",user);
        return doGenerateToken(claims,user.getUsername(),accessTokenExpiration);
    }

    private String doGenerateToken(Map<String, Object> claims, String subject,Long Expiration ) {
        final Date createdDate = new Date(System.currentTimeMillis());
        final Date expirationDate =new Date(createdDate.getTime()  +  Expiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(getSignedKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
        final Date created = getIssuedAtDateFromToken(token);
        return !isCreatedBeforeLastPasswordReset(created, lastPasswordReset)
                && (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    public String refreshToken(String token) {
        final Date createdDate = new Date(System.currentTimeMillis());
        final Date expirationDate = new Date(createdDate.getTime()  +  refreshTokenExpiration * 3);

        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);

        return Jwts.builder()
                .setClaims(claims)
                .signWith(getSignedKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Boolean isTokenexpired(String token){
        try {
            DecodedJWT decodedJWT = JWT.decode(token);
            Date expiresAt = decodedJWT.getExpiresAt();
            return  expiresAt.before(new Date()) ;
        } catch (JWTDecodeException e) {
            // ...
        }
        return false;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        return isValidToken(token,user.getUsername(),user.getLastPasswordResetDate());

    }
    public Boolean validateResetPasswordToken(String token, User user) {
        return isValidToken(token,user.getUsername(),user.getLastPasswordResetDate());
    }
    public Boolean isValidToken(String token, String userName,Date LastPasswordResetDate){
        final String username = getUsernameFromToken(token);
        final Date created = getIssuedAtDateFromToken(token);
        return (
                username.equals(userName)
                       &&
                !isTokenexpired(token)
                        && !isCreatedBeforeLastPasswordReset(created, LastPasswordResetDate)
        );
    }


    private Key getSignedKey(){
        byte[] keyByte = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyByte);
    }

    public String generateResetPasswordToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user",userName);
        return doGenerateToken(claims,userName,resetPasswordTokenExpiration);
    }
}
