import React from "react"
import { ButtonLink, ButtonLinkRed, Card, Form, HelperText, Message, QuestionText, SEO, TextBlock, FileUpload, ObservableCell } from "../components";

export default () => (
    <>
        <SEO title="Prescreen 2" keywords={[`gatsby`, `application`, `react`]} />

        <Message>
            Based on your answers, you are probably affected by WEP. Please enter your information below.
        </Message>

        <h2>Getting your earnings record</h2>
        <div>We'll need some information to get started.</div>
        <Form>
            <Card>
                <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
                <HelperText>
                    If no: you can easily sign up online at this <a href="https://www.ssa.gov/myaccount/">link</a>. Your MySocialSecurity account will let you change your address, change your direct deposit, request an earnings statement or a 1099 form, or apply for a replacement SSA card.
                </HelperText>
                <label> Yes
                    <input type="radio" name="mySocialSecurityAccount" value="true"></input>
                </label>
                <label> No
                    <input type="radio" name="mySocialSecurityAccount" value="false"></input>
                </label>
            </Card>
        </Form>
        <Card>
            I’ve made an account, now what? [skip below to If Yes]
        </Card>
        <Card>
            I’d prefer not to sign up - okay! Are you over 60? SSA sends you a letter in the mail every year with your earnings record. It looks like this:
        </Card>
        <Card>
            [screen grab of the earnings letter]
        </Card>
        <Card>
            I don’t have a copy of this letter - okay! Print out this form (SSA form 7004), complete and mail it to:<br /><br />

            Social Security Administration<br />
            Wilkes Barre Data Operation Center<br />
            PO Box 7004<br />
            Wilkes Barre, PA, 18767-7004<br />
        </Card>
        <Card>
            When you have a copy of the form, return to this page.
        </Card>
        <Card>
            If yes - Great! Download your earnings record as a PDF. You can print it out, or upload it here:
<<<<<<< HEAD
        </TextBlock>
        <FileUpload />
        <ObservableCell cellname='image' isImage={true} />
        <ObservableCell cellname='ocrResult' isTable={true} />
=======
        </Card>
        <ButtonLink to="/prescreen-2/">
            UPLOAD PDF EARNINGS RECORD
        </ButtonLink>
>>>>>>> 05e4502682d51efa15a6fae30f1bbd39057b79e3
        <TextBlock>
            Also make sure you have ready the amount of your pension (whether it’s paid monthly or a lump sum), and the date you became entitled to it (either the date you started receiving a monthly check or the first day you could withdraw from the account). Your plan may send statements to you proactively, or contact your HR administrator for information on how to request a statement.
        </TextBlock>
        <ButtonLinkRed to="/prescreen-1c/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-1c/">Submit</ButtonLink>
    </>
)
