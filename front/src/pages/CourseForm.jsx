import { useState } from "preact/hooks";
import { Link, useParams, useLocation } from "wouter-preact";
import { FormGroup } from "@/components/FormGroup.jsx";
import { Flex } from "@/components/Flex.jsx";
import { ControlWrapper } from "@/components/ControlWrapper.jsx";
import { If } from "@/components/If.jsx";
import { Button } from "@/components/Button.jsx";
import { Title } from "@/components/Title.jsx";
import { Get, Put, Post } from "@/components/Api.jsx";

export function CourseForm () {
  const { uid } = useParams();
  const isEdit = uid !== "new";
  const [location, setCurrentLocation] = useLocation();
  const [formObject, setFormObject] = useState({});
  const updateFormModel = change =>
    setFormObject(outdated => ({ ...outdated, ...change }));
  const navigateEdit = newCourse => setCurrentLocation("/edit/" + newCourse.uid);
  return (
    <Get uri={"/courses/" + uid} state={[formObject, setFormObject]} resolve={data => {
      return (
        <section>
          <Title text={uid} />
          <FormGroup bind={data} watch={updateFormModel}>
            <Flex direction="column">
              <ControlWrapper>
                <input attr="title" placeholder="Course Name" />
              </ControlWrapper>
              <ControlWrapper>
                <textarea attr="description" placeholder="Description" />
              </ControlWrapper>
              <ControlWrapper>
                <input attr="hours" type="number" placeholder="Hours" />
              </ControlWrapper>
              <ControlWrapper>
                <input attr="credits" type="number" placeholder="credits" />
              </ControlWrapper>
              <ControlWrapper>
                <select attr="difficulty">
                  <option></option>
                  <option>hard</option>
                  <option>mid</option>
                  <option>easy</option>
                </select>
              </ControlWrapper>
            </Flex>
          </FormGroup>
          <ControlWrapper>
            <If condition={!isEdit} render={() => (
              <Post uri="/courses" data={data} resolve={navigateEdit}>
                <Button text="save" />
              </Post>
            )} />
            <If condition={isEdit} render={() => (
              <Put uri={"/courses/" + uid} data={data} resolve={() => alert("Update success")}>
                <Button text="update" />
              </Put>
            )} />
          </ControlWrapper>
          <If condition={isEdit} render={() => (
            <Flex justify="space-around">
              <Link to={"/students/" + uid}>add/remove students</Link>
            </Flex>
          )} />
        </section>
      )
    }}>
    </Get>
  );
}
